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


def build_public_question(row: dict[str, str]) -> dict[str, Any]:
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
    if question_type not in {"single_choice", "multi_select", "best_available"}:
        raise BuildError(
            f"Question {question_id}: unsupported question_type {question_type!r}."
        )

    instruction = row.get("question_instruction", "").strip() or None
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
    if question_type in {"multi_select", "best_available"} and instruction is None:
        raise BuildError(
            f"Question {question_id}: {question_type} requires a question instruction."
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

    return {
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
        "answers": answers,
        "correctAnswerIds": correct_answer_ids,
        "correctExplanation": row.get("correct_explanation", "").strip(),
        "studyTopics": split_pipe_values(row.get("study_topics", "")),
    }


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

    if not public_base_path.strip("/"):
        raise BuildError(f"Quiz {slug}: public_base_path is required.")

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
    questions = [build_public_question(row) for row in source_rows]
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
