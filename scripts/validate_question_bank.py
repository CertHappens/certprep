#!/usr/bin/env python3
"""Validate the SEC-701 question bank.

Run from any directory:
    python scripts/validate_question_bank.py

Write the tracked Markdown report only when intentionally requested:
    python scripts/validate_question_bank.py --write-report

The script uses only the Python standard library.
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import csv
from datetime import datetime
from pathlib import Path
import re
import sys


SCRIPT_PATH = Path(__file__).resolve()
SCRIPTS_DIR = SCRIPT_PATH.parent
REPO_ROOT = SCRIPTS_DIR.parent
DATA_DIR = REPO_ROOT / "data" / "security-plus" / "sec-701"
DOCS_DIR = REPO_ROOT / "docs"

DRAFT_FILE = DATA_DIR / "draft-questions.csv"
ACTIVE_FILE = DATA_DIR / "questions.csv"
RETIRED_FILE = DATA_DIR / "retired-questions.csv"
OBJECTIVE_MAP_FILE = DATA_DIR / "objective-map.csv"
SOURCE_REGISTER_FILE = DATA_DIR / "source-register.csv"
BLANK_TEMPLATE_FILE = DOCS_DIR / "blank-question-template.csv"
REPORT_FILE = DOCS_DIR / "validation-report.md"

ACTIVE_HEADERS = [
    "question_id",
    "test_id",
    "certification",
    "exam_version",
    "objectives_version",
    "question_version",
    "batch_id",
    "domain_id",
    "domain_name",
    "objective_id",
    "objective_text",
    "topic",
    "concept_key",
    "difficulty",
    "question_type",
    "question_style",
    "question_instruction",
    "question_text",
    "answer_a",
    "answer_b",
    "answer_c",
    "answer_d",
    "correct_answers",
    "correct_explanation",
    "answer_a_explanation",
    "answer_b_explanation",
    "answer_c_explanation",
    "answer_d_explanation",
    "study_topics",
    "source_ids",
    "reference_notes",
    "date_added",
    "date_modified",
    "date_reviewed",
    "review_status",
    "reviewer",
    "quality_flags",
    "author_notes",
]

RETIREMENT_HEADERS = [
    "retired_date",
    "retirement_reason",
    "replacement_question_id",
]
RETIRED_HEADERS = ACTIVE_HEADERS + RETIREMENT_HEADERS

REQUIRED_ALWAYS = {
    "question_id",
    "test_id",
    "certification",
    "exam_version",
    "objectives_version",
    "question_version",
    "batch_id",
    "domain_id",
    "domain_name",
    "objective_id",
    "objective_text",
    "topic",
    "concept_key",
    "difficulty",
    "question_type",
    "question_style",
    "question_text",
    "answer_a",
    "answer_b",
    "answer_c",
    "answer_d",
    "correct_answers",
    "correct_explanation",
    "answer_a_explanation",
    "answer_b_explanation",
    "answer_c_explanation",
    "answer_d_explanation",
    "study_topics",
    "source_ids",
    "reference_notes",
    "date_added",
    "date_modified",
    "review_status",
}

QUESTION_FILES = {
    DRAFT_FILE: {
        "allowed_statuses": {"draft", "review"},
        "expected_headers": ACTIVE_HEADERS,
        "retired": False,
    },
    ACTIVE_FILE: {
        "allowed_statuses": {"approved"},
        "expected_headers": ACTIVE_HEADERS,
        "retired": False,
    },
    RETIRED_FILE: {
        "allowed_statuses": {"draft", "review", "approved"},
        "expected_headers": RETIRED_HEADERS,
        "retired": True,
    },
}

ENUMS = {
    "difficulty": {"easy", "medium", "hard"},
    "question_type": {"single_choice", "multi_select", "best_available"},
    "question_style": {"direct", "scenario", "comparison", "calculation"},
    "review_status": {"draft", "review", "approved"},
}

QUESTION_ID_RE = re.compile(r"^SEC701-\d{7}$")
CONCEPT_KEY_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
POSITION_DEPENDENT_RE = re.compile(
    r"\b("
    r"all of the above|"
    r"none of the above|"
    r"both [a-d] and [a-d]|"
    r"answers? [a-d](?: and [a-d])?|"
    r"choice [a-d]|"
    r"option [a-d]|"
    r"previous answer|"
    r"following answer|"
    r"choice above|"
    r"choice below"
    r")\b",
    re.IGNORECASE,
)
UNSUPPORTED_ABSOLUTE_RE = re.compile(
    r"\b(always|never|guarantees?|completely prevents?|impossible)\b",
    re.IGNORECASE,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--write-report",
        action="store_true",
        help="Rewrite docs/validation-report.md with the current results.",
    )
    return parser.parse_args()


def relative_path(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open("r", newline="", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file)
        return reader.fieldnames or [], [dict(row) for row in reader]


def normalized(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (text or "").casefold()).strip()


def split_pipe_values(value: str) -> list[str]:
    return [part.strip() for part in (value or "").split("|") if part.strip()]


def valid_iso_date(value: str) -> bool:
    if not DATE_RE.fullmatch(value or ""):
        return False
    try:
        datetime.strptime(value, "%Y-%m-%d")
    except ValueError:
        return False
    return True


def add_error(errors: list[str], location: str, message: str) -> None:
    errors.append(f"{location}: {message}")


def add_warning(warnings: list[str], location: str, message: str) -> None:
    warnings.append(f"{location}: {message}")


def add_info(infos: list[str], location: str, message: str) -> None:
    infos.append(f"{location}: {message}")


def validate_file_exists(path: Path, errors: list[str]) -> None:
    if not path.is_file():
        add_error(errors, relative_path(path), "required file is missing")


def compare_headers(
    actual: list[str],
    expected: list[str],
    path: Path,
    errors: list[str],
) -> None:
    if actual == expected:
        return

    location = relative_path(path)
    missing = [header for header in expected if header not in actual]
    extra = [header for header in actual if header not in expected]

    if missing:
        add_error(errors, location, "missing headers: " + ", ".join(missing))
    if extra:
        add_error(errors, location, "unexpected headers: " + ", ".join(extra))
    if not missing and not extra:
        add_error(errors, location, "headers are present but not in the required order")


def write_report(
    errors: list[str],
    warnings: list[str],
    infos: list[str],
    row_count: int,
    file_counts: dict[str, int],
) -> None:
    lines = [
        "# Validation Report",
        "",
        f"- Run time: {datetime.now().astimezone().isoformat(timespec='seconds')}",
        "- Validator: `scripts/validate_question_bank.py`",
        f"- Question rows validated: {row_count}",
        f"- Errors: {len(errors)}",
        f"- Warnings: {len(warnings)}",
        f"- Information: {len(infos)}",
        "",
        "## File counts",
        "",
    ]

    for filename, count in file_counts.items():
        lines.append(f"- `{filename}`: {count}")

    lines.extend(["", "## Errors", ""])
    lines.extend([f"- {error}" for error in errors] if errors else ["- None"])

    lines.extend(["", "## Warnings", ""])
    lines.extend([f"- {warning}" for warning in warnings] if warnings else ["- None"])

    lines.extend(["", "## Information", ""])
    lines.extend([f"- {info}" for info in infos] if infos else ["- None"])

    lines.extend(
        [
            "",
            "## Notes",
            "",
            "Automated validation checks structure, mappings, answer storage, lifecycle rules, and several common quality problems. It does not replace technical, editorial, or ambiguity review.",
            "",
        ]
    )

    REPORT_FILE.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    args = parse_args()
    errors: list[str] = []
    warnings: list[str] = []
    infos: list[str] = []
    file_counts: dict[str, int] = {}

    required_files = [
        DRAFT_FILE,
        ACTIVE_FILE,
        RETIRED_FILE,
        OBJECTIVE_MAP_FILE,
        SOURCE_REGISTER_FILE,
        BLANK_TEMPLATE_FILE,
    ]

    for path in required_files:
        validate_file_exists(path, errors)

    if errors:
        if args.write_report:
            write_report(errors, warnings, infos, 0, file_counts)
        for message in errors:
            print(f"ERROR: {message}")
        if args.write_report:
            print(f"\nValidation report written: {relative_path(REPORT_FILE)}")
        return 1

    template_headers, template_rows = read_csv(BLANK_TEMPLATE_FILE)
    compare_headers(template_headers, ACTIVE_HEADERS, BLANK_TEMPLATE_FILE, errors)
    if template_rows:
        add_warning(
            warnings,
            relative_path(BLANK_TEMPLATE_FILE),
            "blank template contains data rows",
        )

    objective_headers, objective_rows = read_csv(OBJECTIVE_MAP_FILE)
    source_headers, source_rows = read_csv(SOURCE_REGISTER_FILE)

    required_objective_headers = {
        "test_id",
        "exam_version",
        "objectives_version",
        "domain_id",
        "domain_name",
        "domain_weight_percent",
        "objective_id",
        "objective_text",
        "scope_summary",
    }
    missing_objective_headers = sorted(required_objective_headers - set(objective_headers))
    if missing_objective_headers:
        add_error(
            errors,
            relative_path(OBJECTIVE_MAP_FILE),
            "missing required headers: " + ", ".join(missing_objective_headers),
        )

    required_source_headers = {
        "source_id",
        "organization",
        "title",
        "publication_version",
        "url",
        "notes",
    }
    missing_source_headers = sorted(required_source_headers - set(source_headers))
    if missing_source_headers:
        add_error(
            errors,
            relative_path(SOURCE_REGISTER_FILE),
            "missing required headers: " + ", ".join(missing_source_headers),
        )

    objective_map: dict[str, dict[str, str]] = {}
    for row_number, row in enumerate(objective_rows, start=2):
        location = f"{relative_path(OBJECTIVE_MAP_FILE)}:{row_number}"
        objective_id = (row.get("objective_id") or "").strip()
        if not objective_id:
            add_error(errors, location, "objective_id is blank")
            continue
        if objective_id in objective_map:
            add_error(errors, location, f"duplicate objective_id {objective_id}")
            continue
        objective_map[objective_id] = row

    source_ids: set[str] = set()
    for row_number, row in enumerate(source_rows, start=2):
        location = f"{relative_path(SOURCE_REGISTER_FILE)}:{row_number}"
        source_id = (row.get("source_id") or "").strip()
        if not source_id:
            add_error(errors, location, "source_id is blank")
            continue
        if source_id in source_ids:
            add_error(errors, location, f"duplicate source_id {source_id}")
            continue
        source_ids.add(source_id)

    all_rows: list[tuple[Path, int, dict[str, str]]] = []

    for path, rules in QUESTION_FILES.items():
        headers, rows = read_csv(path)
        file_counts[relative_path(path)] = len(rows)
        compare_headers(headers, rules["expected_headers"], path, errors)

        for row_number, row in enumerate(rows, start=2):
            location = f"{relative_path(path)}:{row_number}"
            all_rows.append((path, row_number, row))

            missing_fields = sorted(
                field for field in REQUIRED_ALWAYS if not (row.get(field) or "").strip()
            )
            if missing_fields:
                add_error(
                    errors,
                    location,
                    "missing required fields: " + ", ".join(missing_fields),
                )

            question_id = (row.get("question_id") or "").strip()
            if not QUESTION_ID_RE.fullmatch(question_id):
                add_error(errors, location, "question_id must match SEC701-0000001 format")

            if row.get("test_id") != "SEC-701":
                add_error(errors, location, "test_id must be SEC-701")
            if row.get("certification") != "CompTIA Security+":
                add_error(errors, location, "certification must be CompTIA Security+")
            if row.get("exam_version") != "SY0-701":
                add_error(errors, location, "exam_version must be SY0-701")
            if row.get("objectives_version") != "6.0":
                add_error(errors, location, "objectives_version must be 6.0")

            try:
                question_version = int((row.get("question_version") or "").strip())
                if question_version < 1:
                    raise ValueError
            except ValueError:
                add_error(errors, location, "question_version must be a positive integer")

            for field, allowed_values in ENUMS.items():
                value = (row.get(field) or "").strip()
                if value not in allowed_values:
                    add_error(errors, location, f"{field} has invalid value {value!r}")

            review_status = (row.get("review_status") or "").strip()
            if review_status not in rules["allowed_statuses"]:
                allowed = ", ".join(sorted(rules["allowed_statuses"]))
                add_error(
                    errors,
                    location,
                    f"review_status {review_status!r} is not allowed in {relative_path(path)}; allowed: {allowed}",
                )

            objective_id = (row.get("objective_id") or "").strip()
            mapped_objective = objective_map.get(objective_id)
            if mapped_objective is None:
                add_error(
                    errors,
                    location,
                    f"objective_id {objective_id!r} is not in objective-map.csv",
                )
            else:
                for field in ("domain_id", "domain_name", "objective_text"):
                    actual = (row.get(field) or "").strip()
                    expected = (mapped_objective.get(field) or "").strip()
                    if actual != expected:
                        add_error(errors, location, f"{field} does not match objective-map.csv")

            concept_key = (row.get("concept_key") or "").strip()
            if not CONCEPT_KEY_RE.fullmatch(concept_key):
                add_error(errors, location, "concept_key must be lowercase kebab-case")

            for date_field in ("date_added", "date_modified"):
                date_value = (row.get(date_field) or "").strip()
                if not valid_iso_date(date_value):
                    add_error(
                        errors,
                        location,
                        f"{date_field} must be a valid YYYY-MM-DD date",
                    )

            date_reviewed = (row.get("date_reviewed") or "").strip()
            if date_reviewed and not valid_iso_date(date_reviewed):
                add_error(errors, location, "date_reviewed must be a valid YYYY-MM-DD date")

            if review_status in {"review", "approved"}:
                if not date_reviewed:
                    add_error(errors, location, "review and approved rows require date_reviewed")
                if not (row.get("reviewer") or "").strip():
                    add_error(errors, location, "review and approved rows require reviewer")

            if review_status == "approved" and (row.get("quality_flags") or "").strip():
                add_error(errors, location, "approved rows may not contain quality_flags")

            date_added = (row.get("date_added") or "").strip()
            date_modified = (row.get("date_modified") or "").strip()
            if valid_iso_date(date_added) and valid_iso_date(date_modified):
                if date_modified < date_added:
                    add_error(errors, location, "date_modified may not precede date_added")

            if (
                date_reviewed
                and valid_iso_date(date_reviewed)
                and valid_iso_date(date_added)
                and date_reviewed < date_added
            ):
                add_error(errors, location, "date_reviewed may not precede date_added")

            choices = {
                letter: (row.get(f"answer_{letter.lower()}") or "").strip()
                for letter in "ABCD"
            }
            if len({normalized(choices[letter]) for letter in "ABCD"}) != 4:
                add_error(errors, location, "answer choices must be distinct")

            correct_answers = split_pipe_values(row.get("correct_answers") or "")
            if any(answer not in {"A", "B", "C", "D"} for answer in correct_answers):
                add_error(errors, location, "correct_answers contains an invalid stored key")
            if correct_answers != sorted(set(correct_answers)):
                add_error(errors, location, "correct_answers must be unique and sorted")

            question_type = (row.get("question_type") or "").strip()
            instruction = (row.get("question_instruction") or "").strip()

            if question_type in {"single_choice", "best_available"}:
                if len(correct_answers) != 1:
                    add_error(
                        errors,
                        location,
                        f"{question_type} requires exactly one correct answer",
                    )

            if question_type == "multi_select":
                if len(correct_answers) < 2:
                    add_error(errors, location, "multi_select requires at least two correct answers")
                if not instruction:
                    add_error(errors, location, "multi_select requires question_instruction")

            if question_type == "best_available" and not instruction:
                add_error(errors, location, "best_available requires question_instruction")

            text_fields = [
                row.get("question_text") or "",
                choices["A"],
                choices["B"],
                choices["C"],
                choices["D"],
            ]
            if any(POSITION_DEPENDENT_RE.search(text) for text in text_fields):
                add_error(errors, location, "position-dependent answer wording detected")

            question_text = (row.get("question_text") or "").strip()
            if question_text.lower().startswith("which is not"):
                add_warning(warnings, location, "question uses an avoidable negative construction")
            if UNSUPPORTED_ABSOLUTE_RE.search(question_text):
                add_warning(warnings, location, "question stem contains a possible unsupported absolute")

            listed_sources = split_pipe_values(row.get("source_ids") or "")
            unknown_sources = sorted(set(listed_sources) - source_ids)
            if unknown_sources:
                add_error(
                    errors,
                    location,
                    "unknown source IDs: " + ", ".join(unknown_sources),
                )

            if rules["retired"]:
                retired_date = (row.get("retired_date") or "").strip()
                retirement_reason = (row.get("retirement_reason") or "").strip()
                replacement_id = (row.get("replacement_question_id") or "").strip()

                if not retired_date:
                    add_error(errors, location, "retired rows require retired_date")
                elif not valid_iso_date(retired_date):
                    add_error(errors, location, "retired_date must be a valid YYYY-MM-DD date")

                if not retirement_reason:
                    add_error(errors, location, "retired rows require retirement_reason")

                if replacement_id and not QUESTION_ID_RE.fullmatch(replacement_id):
                    add_error(
                        errors,
                        location,
                        "replacement_question_id must match SEC701-0000001 format",
                    )
                if replacement_id == question_id:
                    add_error(
                        errors,
                        location,
                        "replacement_question_id may not equal question_id",
                    )

    question_id_locations: defaultdict[str, list[str]] = defaultdict(list)
    stem_locations: defaultdict[str, list[str]] = defaultdict(list)
    concept_locations: defaultdict[str, list[str]] = defaultdict(list)

    for path, row_number, row in all_rows:
        location = f"{relative_path(path)}:{row_number}"
        question_id = (row.get("question_id") or "").strip()
        stem = normalized(row.get("question_text") or "")
        concept_key = (row.get("concept_key") or "").strip()

        if question_id:
            question_id_locations[question_id].append(location)
        if stem:
            stem_locations[stem].append(location)
        if concept_key:
            concept_locations[concept_key].append(location)

    for question_id, locations in question_id_locations.items():
        if len(locations) > 1:
            add_error(
                errors,
                "question bank",
                f"duplicate question_id {question_id}: " + ", ".join(locations),
            )

    for locations in stem_locations.values():
        if len(locations) > 1:
            add_error(
                errors,
                "question bank",
                "exact normalized duplicate stem: " + ", ".join(locations),
            )

    for concept_key, locations in concept_locations.items():
        if len(locations) > 1:
            add_warning(
                warnings,
                "question bank",
                f"repeated concept_key {concept_key}: " + ", ".join(locations),
            )

    active_answer_counts: Counter[str] = Counter()
    _, active_rows = read_csv(ACTIVE_FILE)
    for row in active_rows:
        for answer in split_pipe_values(row.get("correct_answers") or ""):
            active_answer_counts[answer] += 1

    if active_rows:
        distribution = ", ".join(
            f"{letter}={active_answer_counts[letter]}" for letter in "ABCD"
        )
        add_info(
            infos,
            relative_path(ACTIVE_FILE),
            "stored correct-answer distribution: " + distribution,
        )

    if args.write_report:
        write_report(
            errors=errors,
            warnings=warnings,
            infos=infos,
            row_count=len(all_rows),
            file_counts=file_counts,
        )

    print(f"Repository root: {REPO_ROOT}")
    print(f"Validated {len(all_rows)} question rows.")
    print(f"Errors: {len(errors)}")
    print(f"Warnings: {len(warnings)}")
    print(f"Information: {len(infos)}")

    for error in errors:
        print(f"ERROR: {error}")
    for warning in warnings:
        print(f"WARNING: {warning}")
    for info in infos:
        print(f"INFO: {info}")

    if args.write_report:
        print(f"Validation report written: {relative_path(REPORT_FILE)}")
    else:
        print("Validation report not rewritten. Use --write-report when an audit snapshot is needed.")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
