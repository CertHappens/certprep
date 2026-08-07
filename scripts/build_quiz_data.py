#!/usr/bin/env python3
"""Build public quiz JSON from approved question CSV files.

The question schema remains authoritative for authoring. This script creates a
smaller runtime contract for the browser and deliberately excludes internal
editorial fields such as reviewer notes, source IDs, and batch information.
"""

from __future__ import annotations

import csv
import hashlib
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG_PATH = PROJECT_ROOT / "config" / "quiz-catalog.json"
GENERATED_ROOT = PROJECT_ROOT / "src" / "quiz-data"
RUNTIME_SCHEMA_VERSION = 1
ANSWER_KEYS = ("A", "B", "C", "D")
CHOICE_QUESTION_TYPES = {"single_choice", "multi_select", "best_available"}
STRUCTURED_QUESTION_TYPES = {"matching", "ordering", "line_select"}
QUESTION_TYPES = CHOICE_QUESTION_TYPES | STRUCTURED_QUESTION_TYPES
RESPONSE_ID_RE = re.compile(r"^[a-z][a-z0-9_-]{0,39}$")
PREFORMATTED_STIMULUS_VARIANTS = {"command_output", "configuration", "log", "plain_text"}


class BuildError(Exception):
    """Raised when validated authoring data cannot be converted safely."""


def read_json(path: Path) -> dict[str, Any]:
    try:
        with path.open("r", encoding="utf-8") as handle:
            value = json.load(handle)
    except FileNotFoundError as exc:
        raise BuildError(f"Required configuration file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise BuildError(f"Invalid JSON in {path}: {exc}") from exc

    if not isinstance(value, dict):
        raise BuildError(f"Expected a JSON object in {path}.")
    return value


def read_csv(path: Path) -> list[dict[str, str]]:
    try:
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            if reader.fieldnames is None:
                raise BuildError(f"CSV has no header row: {path}")

            rows: list[dict[str, str]] = []
            for row_number, row in enumerate(reader, start=2):
                if None in row:
                    raise BuildError(
                        f"{path}, row {row_number}: found data beyond the declared columns."
                    )
                rows.append({key: (value or "") for key, value in row.items()})
            return rows
    except FileNotFoundError as exc:
        raise BuildError(f"Required CSV file not found: {path}") from exc
    except csv.Error as exc:
        raise BuildError(f"Unable to parse CSV {path}: {exc}") from exc


def split_pipe_values(value: str) -> list[str]:
    """Split the schema's pipe-delimited values and discard empty segments."""

    return [part.strip() for part in value.split("|") if part.strip()]



def _required_text(value: Any, *, label: str, max_length: int) -> str:
    if not isinstance(value, str) or not value.strip():
        raise BuildError(f"{label} must be non-empty text.")
    if len(value) > max_length:
        raise BuildError(f"{label} exceeds {max_length} characters.")
    if "\x00" in value:
        raise BuildError(f"{label} contains a null character.")
    return value.strip()


def normalize_question_stimulus(question_id: str, value: Any) -> dict[str, Any]:
    label = f"Question {question_id} stimulus"
    if not isinstance(value, dict):
        raise BuildError(f"{label} must be a JSON object.")

    stimulus_type = value.get("type")
    title = _required_text(value.get("title"), label=f"{label} title", max_length=160)

    if stimulus_type == "preformatted":
        allowed = {"type", "variant", "title", "content"}
        extra = sorted(set(value) - allowed)
        if extra:
            raise BuildError(f"{label} contains unsupported fields: {', '.join(extra)}")
        variant = value.get("variant")
        if variant not in PREFORMATTED_STIMULUS_VARIANTS:
            raise BuildError(f"{label} has unsupported preformatted variant {variant!r}.")
        raw_content = value.get("content")
        if not isinstance(raw_content, str) or not raw_content.strip():
            raise BuildError(f"{label} content must be non-empty text.")
        if len(raw_content) > 12000:
            raise BuildError(f"{label} content exceeds 12000 characters.")
        if "\x00" in raw_content:
            raise BuildError(f"{label} content contains a null character.")
        content = raw_content.replace("\r\n", "\n").replace("\r", "\n").strip("\n")
        return {"type": "preformatted", "variant": variant, "title": title, "content": content}

    if stimulus_type == "table":
        allowed = {"type", "title", "caption", "columns", "rows"}
        extra = sorted(set(value) - allowed)
        if extra:
            raise BuildError(f"{label} contains unsupported fields: {', '.join(extra)}")
        caption_value = value.get("caption")
        caption = None if caption_value in (None, "") else _required_text(caption_value, label=f"{label} caption", max_length=320)
        columns = value.get("columns")
        rows = value.get("rows")
        if not isinstance(columns, list) or not 1 <= len(columns) <= 10:
            raise BuildError(f"{label} requires 1 to 10 columns.")
        normalized_columns = []
        keys = []
        for index, column in enumerate(columns, start=1):
            if not isinstance(column, dict) or set(column) != {"key", "label"}:
                raise BuildError(f"{label} column {index} must contain only key and label.")
            key = column.get("key")
            if not isinstance(key, str) or not re.fullmatch(r"[a-z][a-z0-9_]*", key):
                raise BuildError(f"{label} column {index} has an invalid key.")
            column_label = _required_text(column.get("label"), label=f"{label} column {index} label", max_length=120)
            keys.append(key)
            normalized_columns.append({"key": key, "label": column_label})
        if len(set(keys)) != len(keys):
            raise BuildError(f"{label} column keys must be unique.")
        if not isinstance(rows, list) or not 1 <= len(rows) <= 50:
            raise BuildError(f"{label} requires 1 to 50 rows.")
        normalized_rows = []
        expected = set(keys)
        for index, row in enumerate(rows, start=1):
            if not isinstance(row, dict) or set(row) != expected:
                raise BuildError(f"{label} row {index} must contain exactly the declared column keys.")
            normalized_row = {}
            for key in keys:
                cell = row[key]
                if not isinstance(cell, str) or len(cell) > 500 or "\x00" in cell:
                    raise BuildError(f"{label} row {index} cell {key} must be text no longer than 500 characters.")
                normalized_row[key] = cell
            normalized_rows.append(normalized_row)
        result = {"type": "table", "title": title, "columns": normalized_columns, "rows": normalized_rows}
        if caption is not None:
            result["caption"] = caption
        return result

    raise BuildError(f"{label} has unsupported type {stimulus_type!r}.")


def load_question_stimuli(
    path: Path,
    known_question_ids: set[str],
    *,
    allow_unknown: bool = False,
) -> dict[str, dict[str, Any]]:
    registry = read_json(path)
    if registry.get("schemaVersion") != 1:
        raise BuildError(f"Unsupported stimulus schemaVersion in {path}: {registry.get('schemaVersion')!r}.")
    values = registry.get("stimuli")
    if not isinstance(values, dict):
        raise BuildError(f"Stimulus registry {path} must contain a stimuli object.")
    unknown = sorted(set(values) - known_question_ids)
    if unknown and not allow_unknown:
        raise BuildError(f"Stimulus registry {path} contains unknown question IDs: {', '.join(unknown)}")
    normalized = {
        question_id: normalize_question_stimulus(question_id, value)
        for question_id, value in values.items()
    }
    if allow_unknown:
        return {
            question_id: value
            for question_id, value in normalized.items()
            if question_id in known_question_ids
        }
    return normalized


def _response_id(value: Any, *, label: str) -> str:
    if not isinstance(value, str) or not RESPONSE_ID_RE.fullmatch(value):
        raise BuildError(
            f"{label} must start with a lowercase letter and contain only lowercase letters, numbers, underscores, or hyphens."
        )
    return value


def normalize_question_response(
    question_id: str,
    value: Any,
    *,
    stimulus: dict[str, Any] | None = None,
) -> dict[str, Any]:
    label = f"Question {question_id} response"
    if not isinstance(value, dict) or isinstance(value, list):
        raise BuildError(f"{label} must be a JSON object.")

    response_type = value.get("type")

    if response_type == "matching":
        allowed = {"type", "variant", "items", "options"}
        extra = sorted(set(value) - allowed)
        if extra:
            raise BuildError(f"{label} contains unsupported fields: {', '.join(extra)}")
        variant = value.get("variant")
        if variant not in {"matching", "classification"}:
            raise BuildError(f"{label} matching variant must be 'matching' or 'classification'.")
        items = value.get("items")
        options = value.get("options")
        if not isinstance(items, list) or not 2 <= len(items) <= 10:
            raise BuildError(f"{label} requires 2 to 10 matching items.")
        if not isinstance(options, list) or not 2 <= len(options) <= 10:
            raise BuildError(f"{label} requires 2 to 10 matching options.")

        normalized_options = []
        option_ids = []
        for index, option in enumerate(options, start=1):
            if not isinstance(option, dict) or set(option) != {"id", "label"}:
                raise BuildError(f"{label} option {index} must contain only id and label.")
            option_id = _response_id(option.get("id"), label=f"{label} option {index} id")
            option_label = _required_text(option.get("label"), label=f"{label} option {index} label", max_length=180)
            option_ids.append(option_id)
            normalized_options.append({"id": option_id, "label": option_label})
        if len(set(option_ids)) != len(option_ids):
            raise BuildError(f"{label} option IDs must be unique.")

        normalized_items = []
        item_ids = []
        correct_option_ids = []
        for index, item in enumerate(items, start=1):
            if not isinstance(item, dict) or set(item) != {"id", "text", "correctOptionId", "explanation"}:
                raise BuildError(
                    f"{label} item {index} must contain only id, text, correctOptionId, and explanation."
                )
            item_id = _response_id(item.get("id"), label=f"{label} item {index} id")
            text = _required_text(item.get("text"), label=f"{label} item {index} text", max_length=500)
            correct_option_id = _response_id(
                item.get("correctOptionId"), label=f"{label} item {index} correctOptionId"
            )
            explanation = _required_text(
                item.get("explanation"), label=f"{label} item {index} explanation", max_length=1200
            )
            if correct_option_id not in option_ids:
                raise BuildError(f"{label} item {index} references an unknown matching option.")
            item_ids.append(item_id)
            correct_option_ids.append(correct_option_id)
            normalized_items.append({
                "id": item_id,
                "text": text,
                "correctOptionId": correct_option_id,
                "explanation": explanation,
            })
        if len(set(item_ids)) != len(item_ids):
            raise BuildError(f"{label} item IDs must be unique.")
        if variant == "matching":
            if len(items) != len(options):
                raise BuildError(f"{label} one-to-one matching requires the same number of items and options.")
            if len(set(correct_option_ids)) != len(correct_option_ids):
                raise BuildError(f"{label} one-to-one matching may use each option only once.")

        return {
            "type": "matching",
            "variant": variant,
            "items": normalized_items,
            "options": normalized_options,
        }

    if response_type == "ordering":
        allowed = {"type", "items", "correctOrder"}
        extra = sorted(set(value) - allowed)
        if extra:
            raise BuildError(f"{label} contains unsupported fields: {', '.join(extra)}")
        items = value.get("items")
        correct_order = value.get("correctOrder")
        if not isinstance(items, list) or not 3 <= len(items) <= 10:
            raise BuildError(f"{label} requires 3 to 10 ordering items.")
        normalized_items = []
        item_ids = []
        for index, item in enumerate(items, start=1):
            if not isinstance(item, dict) or set(item) != {"id", "text", "explanation"}:
                raise BuildError(f"{label} item {index} must contain only id, text, and explanation.")
            item_id = _response_id(item.get("id"), label=f"{label} item {index} id")
            text = _required_text(item.get("text"), label=f"{label} item {index} text", max_length=500)
            explanation = _required_text(
                item.get("explanation"), label=f"{label} item {index} explanation", max_length=1200
            )
            item_ids.append(item_id)
            normalized_items.append({"id": item_id, "text": text, "explanation": explanation})
        if len(set(item_ids)) != len(item_ids):
            raise BuildError(f"{label} item IDs must be unique.")
        if not isinstance(correct_order, list) or correct_order != list(dict.fromkeys(correct_order)):
            raise BuildError(f"{label} correctOrder must be a unique list of item IDs.")
        if set(correct_order) != set(item_ids) or len(correct_order) != len(item_ids):
            raise BuildError(f"{label} correctOrder must contain every ordering item exactly once.")
        return {"type": "ordering", "items": normalized_items, "correctOrder": correct_order}

    if response_type == "line_select":
        allowed = {"type", "selectionCount", "correctLineNumbers"}
        extra = sorted(set(value) - allowed)
        if extra:
            raise BuildError(f"{label} contains unsupported fields: {', '.join(extra)}")
        selection_count = value.get("selectionCount")
        correct_line_numbers = value.get("correctLineNumbers")
        if not isinstance(selection_count, int) or not 1 <= selection_count <= 8:
            raise BuildError(f"{label} selectionCount must be an integer from 1 through 8.")
        if (
            not isinstance(correct_line_numbers, list)
            or len(correct_line_numbers) != selection_count
            or any(not isinstance(number, int) or number < 1 for number in correct_line_numbers)
            or correct_line_numbers != sorted(set(correct_line_numbers))
        ):
            raise BuildError(
                f"{label} correctLineNumbers must contain exactly selectionCount sorted, unique positive integers."
            )
        if not stimulus or stimulus.get("type") != "preformatted":
            raise BuildError(f"{label} requires a preformatted question stimulus.")
        lines = stimulus.get("content", "").split("\n")
        if len(lines) > 100:
            raise BuildError(f"{label} supports at most 100 stimulus lines.")
        for number in correct_line_numbers:
            if number > len(lines):
                raise BuildError(f"{label} references line {number}, but the stimulus has only {len(lines)} lines.")
            if not lines[number - 1].strip():
                raise BuildError(f"{label} may not identify blank stimulus line {number} as correct.")
        return {
            "type": "line_select",
            "selectionCount": selection_count,
            "correctLineNumbers": correct_line_numbers,
        }

    raise BuildError(f"{label} has unsupported type {response_type!r}.")


def load_question_responses(
    path: Path,
    known_question_ids: set[str],
    *,
    stimuli: dict[str, dict[str, Any]] | None = None,
    allow_unknown: bool = False,
) -> dict[str, dict[str, Any]]:
    registry = read_json(path)
    if registry.get("schemaVersion") != 1:
        raise BuildError(f"Unsupported response schemaVersion in {path}: {registry.get('schemaVersion')!r}.")
    values = registry.get("responses")
    if not isinstance(values, dict):
        raise BuildError(f"Response registry {path} must contain a responses object.")
    unknown = sorted(set(values) - known_question_ids)
    if unknown and not allow_unknown:
        raise BuildError(f"Response registry {path} contains unknown question IDs: {', '.join(unknown)}")
    stimulus_map = stimuli or {}
    values_to_normalize = (
        {question_id: value for question_id, value in values.items() if question_id in known_question_ids}
        if allow_unknown
        else values
    )
    return {
        question_id: normalize_question_response(
            question_id, value, stimulus=stimulus_map.get(question_id)
        )
        for question_id, value in values_to_normalize.items()
    }

def stable_answer_id(question_id: str, stored_key: str) -> str:
    """Create a stable answer identity independent of displayed position."""

    normalized_key = stored_key.strip().upper()
    if normalized_key not in ANSWER_KEYS:
        raise BuildError(
            f"Question {question_id}: unsupported stored answer key {stored_key!r}."
        )
    return f"{question_id}:{normalized_key}"


def utc_timestamp() -> str:
    return (
        datetime.now(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )


def canonical_hash(value: Any) -> str:
    """Create a deterministic version hash from public runtime content."""

    encoded = json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")
    return f"sha256:{hashlib.sha256(encoded).hexdigest()}"


def positive_integer(value: str, *, label: str) -> int:
    try:
        number = int(value)
    except (TypeError, ValueError) as exc:
        raise BuildError(f"{label} must be a positive integer, received {value!r}.") from exc

    if number < 1:
        raise BuildError(f"{label} must be a positive integer, received {value!r}.")
    return number


def calculate_question_count_settings(
    available_count: int,
    configured_options: list[int],
    preferred_default: int,
) -> tuple[list[int], int]:
    """Return enabled question counts and the safest available default."""

    if available_count < 1:
        raise BuildError("At least one approved question is required to build quiz data.")

    normalized_options = sorted(
        {
            int(option)
            for option in configured_options
            if isinstance(option, int) and option > 0
        }
    )
    enabled_options = [option for option in normalized_options if option <= available_count]

    # This fallback keeps development possible if a future bank temporarily has
    # fewer questions than its smallest normal public option.
    if not enabled_options:
        enabled_options = [available_count]

    default_count = (
        preferred_default
        if preferred_default in enabled_options
        else max(enabled_options)
    )
    return enabled_options, default_count


def build_public_question(
    row: dict[str, str],
    stimulus: dict[str, Any] | None = None,
    response: dict[str, Any] | None = None,
) -> dict[str, Any]:
    question_id = row.get("question_id", "").strip()
    if not question_id:
        raise BuildError("Encountered an active question without a question_id.")

    if row.get("review_status", "").strip() != "approved":
        raise BuildError(
            f"Question {question_id}: the active file may contain only approved rows."
        )

    required_public_fields = {
        "question_text": "question text",
        "topic": "topic",
        "domain_id": "domain ID",
        "domain_name": "domain name",
        "objective_id": "objective ID",
        "objective_text": "objective text",
        "correct_explanation": "correct-answer explanation",
        "study_topics": "study topics",
    }
    for field_name, label in required_public_fields.items():
        if not row.get(field_name, "").strip():
            raise BuildError(f"Question {question_id}: missing {label}.")

    question_type = row.get("question_type", "").strip()
    if question_type not in QUESTION_TYPES:
        raise BuildError(
            f"Question {question_id}: unsupported question_type {question_type!r}."
        )

    instruction = row.get("question_instruction", "").strip() or None
    if question_type in {"multi_select", "best_available", *STRUCTURED_QUESTION_TYPES} and instruction is None:
        raise BuildError(
            f"Question {question_id}: {question_type} requires a question instruction."
        )

    question = {
        "id": question_id,
        "version": positive_integer(
            row.get("question_version", ""),
            label=f"Question {question_id} question_version",
        ),
        "type": question_type,
        "style": row.get("question_style", "").strip(),
        "difficulty": row.get("difficulty", "").strip(),
        "instruction": instruction,
        "text": row.get("question_text", "").strip(),
        "topic": row.get("topic", "").strip(),
        "domain": {
            "id": row.get("domain_id", "").strip(),
            "name": row.get("domain_name", "").strip(),
        },
        "objective": {
            "id": row.get("objective_id", "").strip(),
            "text": row.get("objective_text", "").strip(),
        },
        "correctExplanation": row.get("correct_explanation", "").strip(),
        "studyTopics": split_pipe_values(row.get("study_topics", "")),
    }

    if question_type in CHOICE_QUESTION_TYPES:
        if response is not None:
            raise BuildError(
                f"Question {question_id}: choice questions may not define a structured response."
            )
        correct_keys = [key.upper() for key in split_pipe_values(row.get("correct_answers", ""))]
        if not correct_keys:
            raise BuildError(f"Question {question_id}: no correct answer key was supplied.")
        if len(correct_keys) != len(set(correct_keys)):
            raise BuildError(f"Question {question_id}: correct answer keys must be unique.")
        if question_type in {"single_choice", "best_available"} and len(correct_keys) != 1:
            raise BuildError(
                f"Question {question_id}: {question_type} requires exactly one correct answer."
            )
        if question_type == "multi_select" and len(correct_keys) < 2:
            raise BuildError(
                f"Question {question_id}: multi_select requires at least two correct answers."
            )

        answers: list[dict[str, str]] = []
        for key in ANSWER_KEYS:
            suffix = key.lower()
            answer_text = row.get(f"answer_{suffix}", "").strip()
            explanation = row.get(f"answer_{suffix}_explanation", "").strip()
            if not answer_text or not explanation:
                raise BuildError(
                    f"Question {question_id}: answer {key} requires text and an explanation."
                )

            answers.append(
                {
                    "id": stable_answer_id(question_id, key),
                    "text": answer_text,
                    "explanation": explanation,
                }
            )

        correct_answer_ids = [stable_answer_id(question_id, key) for key in correct_keys]
        known_answer_ids = {answer["id"] for answer in answers}
        if not set(correct_answer_ids).issubset(known_answer_ids):
            raise BuildError(
                f"Question {question_id}: a correct answer does not match a stored answer."
            )

        question["answers"] = answers
        question["correctAnswerIds"] = correct_answer_ids
    else:
        structured_choice_fields = [
            row.get("answer_a", "").strip(),
            row.get("answer_b", "").strip(),
            row.get("answer_c", "").strip(),
            row.get("answer_d", "").strip(),
            row.get("correct_answers", "").strip(),
            row.get("answer_a_explanation", "").strip(),
            row.get("answer_b_explanation", "").strip(),
            row.get("answer_c_explanation", "").strip(),
            row.get("answer_d_explanation", "").strip(),
        ]
        if any(structured_choice_fields):
            raise BuildError(
                f"Question {question_id}: structured questions must leave answer A-D, correct_answers, and answer-choice explanations blank."
            )
        if response is None:
            raise BuildError(
                f"Question {question_id}: {question_type} requires a structured response sidecar entry."
            )
        if response.get("type") != question_type:
            raise BuildError(
                f"Question {question_id}: response type {response.get('type')!r} does not match question_type {question_type!r}."
            )
        question["response"] = response

    if stimulus is not None:
        question["stimulus"] = stimulus
    return question

def consistent_test_metadata(rows: list[dict[str, str]], slug: str) -> dict[str, str]:
    field_map = {
        "testId": "test_id",
        "certification": "certification",
        "examVersion": "exam_version",
        "objectivesVersion": "objectives_version",
    }
    metadata: dict[str, str] = {"slug": slug}

    for public_name, csv_name in field_map.items():
        values = {row.get(csv_name, "").strip() for row in rows}
        if "" in values:
            raise BuildError(f"Active questions contain a blank {csv_name} value.")
        if len(values) != 1:
            raise BuildError(
                f"Active questions contain inconsistent {csv_name} values: "
                f"{sorted(values)}"
            )
        metadata[public_name] = values.pop()

    return metadata


def build_domains(
    objective_rows: list[dict[str, str]],
    test: dict[str, str],
    questions: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    domain_counts = Counter(question["domain"]["id"] for question in questions)
    domains: dict[str, dict[str, Any]] = {}

    for row in objective_rows:
        if (
            row.get("test_id", "").strip() != test["testId"]
            or row.get("exam_version", "").strip() != test["examVersion"]
            or row.get("objectives_version", "").strip() != test["objectivesVersion"]
        ):
            continue

        domain_id = row.get("domain_id", "").strip()
        domain_name = row.get("domain_name", "").strip()
        weight_text = row.get("domain_weight_percent", "").strip()
        if not domain_id or not domain_name or not weight_text:
            raise BuildError("Objective map contains incomplete domain metadata.")

        try:
            weight_percent = int(weight_text)
        except ValueError as exc:
            raise BuildError(
                f"Domain {domain_id}: invalid domain_weight_percent {weight_text!r}."
            ) from exc

        existing = domains.get(domain_id)
        candidate = {
            "id": domain_id,
            "name": domain_name,
            "weightPercent": weight_percent,
            "availableQuestionCount": domain_counts.get(domain_id, 0),
        }
        if existing and existing != candidate:
            raise BuildError(f"Objective map contains inconsistent data for domain {domain_id}.")
        domains[domain_id] = candidate

    if not domains:
        raise BuildError(
            f"No objective-map domains matched {test['testId']} {test['examVersion']}."
        )

    return sorted(domains.values(), key=lambda item: float(item["id"]))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def build_quiz(
    quiz_config: dict[str, Any],
    *,
    project_root: Path = PROJECT_ROOT,
    output_directory_override: Path | None = None,
    generated_at: str | None = None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    slug = str(quiz_config.get("slug", "")).strip().strip("/")
    if not slug:
        raise BuildError("Each quiz configuration requires a slug.")

    questions_path = project_root / str(quiz_config.get("questions_csv", ""))
    objective_map_path = project_root / str(quiz_config.get("objective_map_csv", ""))
    output_directory = output_directory_override or (
        project_root / str(quiz_config.get("output_directory", ""))
    )
    public_base_path = "/" + str(
        quiz_config.get("public_base_path", "")
    ).strip().strip("/")
    practice_test_path = "/" + str(
        quiz_config.get("practice_test_path", "")
    ).strip().strip("/")

    if not public_base_path.strip("/"):
        raise BuildError(f"Quiz {slug}: public_base_path is required.")
    if not practice_test_path.strip("/"):
        raise BuildError(f"Quiz {slug}: practice_test_path is required.")

    source_rows = read_csv(questions_path)
    if not source_rows:
        raise BuildError(f"No active questions found in {questions_path}.")

    question_ids = [row.get("question_id", "").strip() for row in source_rows]
    duplicate_ids = sorted(
        question_id
        for question_id, count in Counter(question_ids).items()
        if question_id and count > 1
    )
    if duplicate_ids:
        raise BuildError(
            f"Duplicate question IDs in active file: {', '.join(duplicate_ids)}"
        )

    test = consistent_test_metadata(source_rows, slug)
    test["practiceTestPath"] = practice_test_path
    stimuli: dict[str, dict[str, Any]] = {}
    stimuli_path_value = str(quiz_config.get("stimuli_json", "")).strip()
    if stimuli_path_value:
        stimuli = load_question_stimuli(
            project_root / stimuli_path_value,
            set(question_ids),
            allow_unknown=True,
        )

    responses: dict[str, dict[str, Any]] = {}
    responses_path_value = str(quiz_config.get("responses_json", "")).strip()
    if responses_path_value:
        responses = load_question_responses(
            project_root / responses_path_value,
            set(question_ids),
            stimuli=stimuli,
            allow_unknown=True,
        )

    questions = [
        build_public_question(
            row,
            stimuli.get(row.get("question_id", "").strip()),
            responses.get(row.get("question_id", "").strip()),
        )
        for row in source_rows
    ]
    objective_rows = read_csv(objective_map_path)
    domains = build_domains(objective_rows, test, questions)

    configured_options = quiz_config.get("question_count_options", [])
    if not isinstance(configured_options, list):
        raise BuildError(f"Quiz {slug}: question_count_options must be an array.")

    preferred_default = quiz_config.get("preferred_default_question_count", 30)
    if not isinstance(preferred_default, int) or preferred_default < 1:
        raise BuildError(
            f"Quiz {slug}: preferred_default_question_count must be a positive integer."
        )

    enabled_options, default_count = calculate_question_count_settings(
        len(questions), configured_options, preferred_default
    )

    version_basis = {
        "schemaVersion": RUNTIME_SCHEMA_VERSION,
        "test": test,
        "questions": questions,
    }
    data_version = canonical_hash(version_basis)
    timestamp = generated_at or utc_timestamp()

    questions_file = f"{public_base_path}/questions.json"
    manifest_file = f"{public_base_path}/manifest.json"

    question_payload = {
        "schemaVersion": RUNTIME_SCHEMA_VERSION,
        "generatedAt": timestamp,
        "dataVersion": data_version,
        "test": test,
        "questionCount": len(questions),
        "questions": questions,
    }

    manifest = {
        "schemaVersion": RUNTIME_SCHEMA_VERSION,
        "generatedAt": timestamp,
        "dataVersion": data_version,
        "test": test,
        "availableQuestionCount": len(questions),
        "questionCountOptions": enabled_options,
        "preferredDefaultQuestionCount": preferred_default,
        "defaultQuestionCount": default_count,
        "questionTypes": sorted({question["type"] for question in questions}),
        "domains": domains,
        "questionsFile": questions_file,
    }

    write_json(output_directory / "questions.json", question_payload)
    write_json(output_directory / "manifest.json", manifest)

    catalog_entry = {
        "test": test,
        "dataVersion": data_version,
        "availableQuestionCount": len(questions),
        "questionCountOptions": enabled_options,
        "preferredDefaultQuestionCount": preferred_default,
        "defaultQuestionCount": default_count,
        "manifestFile": manifest_file,
        "questionsFile": questions_file,
    }
    return manifest, catalog_entry


def remove_generated_json_files(root: Path) -> None:
    if not root.exists():
        return
    for path in root.rglob("*.json"):
        path.unlink()


def load_catalog_config(config_path: Path) -> list[dict[str, Any]]:
    config = read_json(config_path)
    if config.get("schema_version") != 1:
        raise BuildError(
            f"Unsupported quiz catalog schema_version: {config.get('schema_version')!r}."
        )

    quizzes = config.get("quizzes")
    if not isinstance(quizzes, list) or not quizzes:
        raise BuildError("quiz-catalog.json must contain at least one quiz configuration.")
    if not all(isinstance(item, dict) for item in quizzes):
        raise BuildError("Every quiz configuration must be a JSON object.")
    return quizzes


def main() -> int:
    config_path = DEFAULT_CONFIG_PATH
    if len(sys.argv) > 2 or (len(sys.argv) == 2 and sys.argv[1] in {"-h", "--help"}):
        print("Usage: python scripts/build_quiz_data.py [config-path]")
        return 0 if len(sys.argv) == 2 else 2
    if len(sys.argv) == 2:
        config_path = (PROJECT_ROOT / sys.argv[1]).resolve()

    try:
        quiz_configs = load_catalog_config(config_path)
        remove_generated_json_files(GENERATED_ROOT)
        GENERATED_ROOT.mkdir(parents=True, exist_ok=True)

        generated_at = utc_timestamp()
        catalog_entries: list[dict[str, Any]] = []
        seen_slugs: set[str] = set()
        seen_public_paths: set[str] = set()

        for quiz_config in quiz_configs:
            slug = str(quiz_config.get("slug", "")).strip().strip("/")
            public_path = "/" + str(
                quiz_config.get("public_base_path", "")
            ).strip().strip("/")
            if slug in seen_slugs:
                raise BuildError(f"Duplicate quiz slug in configuration: {slug}")
            if public_path in seen_public_paths:
                raise BuildError(
                    f"Duplicate public_base_path in configuration: {public_path}"
                )
            seen_slugs.add(slug)
            seen_public_paths.add(public_path)

            manifest, catalog_entry = build_quiz(
                quiz_config,
                project_root=PROJECT_ROOT,
                generated_at=generated_at,
            )
            catalog_entries.append(catalog_entry)
            print(
                f"Generated {manifest['availableQuestionCount']} approved questions "
                f"for {manifest['test']['testId']}."
            )

        catalog_basis = {
            "schemaVersion": RUNTIME_SCHEMA_VERSION,
            "quizzes": catalog_entries,
        }
        catalog = {
            "schemaVersion": RUNTIME_SCHEMA_VERSION,
            "generatedAt": generated_at,
            "catalogVersion": canonical_hash(catalog_basis),
            "quizzes": catalog_entries,
        }
        write_json(GENERATED_ROOT / "catalog.json", catalog)
        print(f"Generated quiz catalog for {len(catalog_entries)} exam version(s).")
        return 0
    except BuildError as exc:
        print(f"Quiz data build failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
