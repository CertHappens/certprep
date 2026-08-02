#!/usr/bin/env python3
"""Validate every configured Cert Happens question bank."""

from __future__ import annotations

import csv
import difflib
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path

from build_quiz_data import BuildError, load_question_stimuli

BANK_CONFIGS = [
    {
        "label": "SEC-701",
        "path": ("data", "security-plus", "sec-701"),
        "test_id": "SEC-701",
        "certification": "CompTIA Security+",
        "exam_version": "SY0-701",
        "objectives_version": "6.0",
        "id_pattern": r"^SEC701-(\d{7})$",
        "batch_pattern": r"^SEC701-(?:BATCH-\d{3}|SAMPLE-001)$",
        "expected_objectives": {
            "1.1", "1.2", "1.3", "1.4",
            "2.1", "2.2", "2.3", "2.4", "2.5",
            "3.1", "3.2", "3.3", "3.4",
            "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9",
            "5.1", "5.2", "5.3", "5.4", "5.5", "5.6",
        },
    },
    {
        "label": "CCNA-301-V2",
        "path": ("data", "ccna", "200-301-v2"),
        "test_id": "CCNA-301-V2",
        "certification": "Cisco CCNA",
        "exam_version": "200-301 v2.0",
        "objectives_version": "2.0",
        "id_pattern": r"^CCNA301V2-(\d{7})$",
        "batch_pattern": r"^CCNA301V2-BATCH-\d{3}$",
        "stimuli_file": "stimuli.json",
        "expected_objectives": {
            "1.1", "1.2", "1.3", "1.4", "1.5", "1.5.a", "1.5.b", "1.5.c", "1.5.d", "1.6", "1.7",
            "2.1", "2.1.a", "2.1.b", "2.1.c", "2.1.d",
            "2.2", "2.2.a", "2.2.b", "2.2.c", "2.2.d", "2.2.e",
            "2.3", "2.4", "2.5", "2.5.a", "2.5.b", "2.5.c", "2.5.d",
            "3.1", "3.2", "3.2.a", "3.2.b", "3.2.c", "3.2.d",
            "3.3", "3.3.a", "3.3.b", "3.3.c", "3.3.d", "3.4",
            "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7",
            "4.7.a", "4.7.b", "4.7.c", "4.7.d", "4.7.e",
            "5.1", "5.2", "5.3", "5.4", "5.5", "5.6",
        },
    },
    {
        "label": "NET-009",
        "path": ("data", "network-plus", "n10-009"),
        "test_id": "NET-009",
        "certification": "CompTIA Network+",
        "exam_version": "N10-009",
        "objectives_version": "6.0",
        "id_pattern": r"^NET009-(\d{7})$",
        "batch_pattern": r"^NET009-BATCH-\d{3}$",
        "expected_objectives": {
            "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8",
            "2.1", "2.2", "2.3", "2.4",
            "3.1", "3.2", "3.3", "3.4", "3.5",
            "4.1", "4.2", "4.3",
            "5.1", "5.2", "5.3", "5.4", "5.5",
        },
    },
]

TEST_ID = ""
CERTIFICATION = ""
EXAM_VERSION = ""
OBJECTIVES_VERSION = ""
BANK_PATH: tuple[str, ...] = ()
EXPECTED_OBJECTIVES: set[str] = set()
ID_RE = re.compile(r"$^")
BATCH_RE = re.compile(r"$^")
STIMULI_FILE = ""
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
CONCEPT_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def configure_bank(config: dict[str, object]) -> None:
    global TEST_ID, CERTIFICATION, EXAM_VERSION, OBJECTIVES_VERSION
    global BANK_PATH, EXPECTED_OBJECTIVES, ID_RE, BATCH_RE, STIMULI_FILE

    TEST_ID = str(config["test_id"])
    CERTIFICATION = str(config["certification"])
    EXAM_VERSION = str(config["exam_version"])
    OBJECTIVES_VERSION = str(config["objectives_version"])
    BANK_PATH = tuple(str(part) for part in config["path"])
    EXPECTED_OBJECTIVES = set(config["expected_objectives"])
    ID_RE = re.compile(str(config["id_pattern"]))
    BATCH_RE = re.compile(str(config["batch_pattern"]))
    STIMULI_FILE = str(config.get("stimuli_file", ""))


ABSOLUTE_RE = re.compile(r"\b(always|never|guarantees?|completely|impossible)\b", re.I)
POSITION_RE = re.compile(
    r"\b(all|none) of the above\b|\bboth [ABCD] and [ABCD]\b|"
    r"\b(previous|next|above|below) (answer|choice|option)\b",
    re.I,
)

QUESTION_HEADERS = [
    "question_id","test_id","certification","exam_version","objectives_version",
    "question_version","batch_id","domain_id","domain_name","objective_id",
    "objective_text","topic","concept_key","difficulty","question_type",
    "question_style","question_instruction","question_text","answer_a","answer_b",
    "answer_c","answer_d","correct_answers","correct_explanation",
    "answer_a_explanation","answer_b_explanation","answer_c_explanation",
    "answer_d_explanation","study_topics","source_ids","reference_notes",
    "date_added","date_modified","date_reviewed","review_status","reviewer",
    "quality_flags","author_notes"
]
RETIRED_HEADERS = QUESTION_HEADERS + [
    "retired_date","retirement_reason","replacement_question_id"
]
OBJECTIVE_HEADERS = [
    "test_id","exam_version","objectives_version","domain_id","domain_name",
    "domain_weight_percent","objective_id","objective_text","scope_summary"
]
SOURCE_HEADERS = [
    "source_id","organization","title","publication_version","url","notes"
]

ENUMS = {
    "difficulty": {"easy","medium","hard"},
    "question_type": {"single_choice","multi_select","best_available"},
    "question_style": {"direct","scenario","comparison","calculation"},
    "review_status": {"draft","review","approved"},
}
FILE_STATUS = {
    "draft-questions.csv": {"draft","review"},
    "questions.csv": {"approved"},
    "retired-questions.csv": {"approved"},
}

def normalized(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()

def reversed_clause_signature(value: str) -> tuple[str, ...]:
    clauses = [normalized(part) for part in re.split(r"\band\b", value, flags=re.I)]
    return tuple(sorted(part for part in clauses if part))

def parse_date(value: str) -> date | None:
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None

def read_csv(path: Path, expected_headers: list[str], errors: list[str]) -> list[dict[str, str]]:
    if not path.exists():
        errors.append(f"Missing file: {path}")
        return []
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != expected_headers:
            errors.append(
                f"{path.name}: header mismatch.\n"
                f"  Expected: {expected_headers}\n"
                f"  Found:    {reader.fieldnames}"
            )
        return list(reader)


def validate_stimulus_sidecar(
    path: Path,
    approved_question_ids: set[str],
    errors: list[str],
) -> int:
    try:
        stimuli = load_question_stimuli(path, approved_question_ids)
    except BuildError as exc:
        errors.append(f"{path.name}: {exc}")
        return 0
    return len(stimuli)


def validate() -> tuple[list[str], list[str], list[str]]:
    root = Path(__file__).resolve().parents[1]
    bank = root.joinpath(*BANK_PATH)
    errors: list[str] = []
    warnings: list[str] = []
    info: list[str] = []

    objectives = read_csv(bank / "objective-map.csv", OBJECTIVE_HEADERS, errors)
    sources = read_csv(bank / "source-register.csv", SOURCE_HEADERS, errors)
    question_sets = {
        name: read_csv(
            bank / name,
            RETIRED_HEADERS if name == "retired-questions.csv" else QUESTION_HEADERS,
            errors,
        )
        for name in FILE_STATUS
    }

    stimulus_count = 0
    if STIMULI_FILE:
        approved_question_ids = {
            row.get("question_id", "").strip()
            for row in question_sets["questions.csv"]
            if row.get("question_id", "").strip()
        }
        stimulus_count = validate_stimulus_sidecar(
            bank / STIMULI_FILE,
            approved_question_ids,
            errors,
        )

    objective_by_id: dict[str, dict[str, str]] = {}
    for index, row in enumerate(objectives, start=2):
        label = f"objective-map.csv row {index}"
        if row["objective_id"] in objective_by_id:
            errors.append(f"{label}: duplicate objective_id {row['objective_id']}")
        objective_by_id[row["objective_id"]] = row
        if row["test_id"] != TEST_ID:
            errors.append(f"{label}: test_id must be {TEST_ID}")
        if row["exam_version"] != EXAM_VERSION:
            errors.append(f"{label}: exam_version must be {EXAM_VERSION}")
        if row["objectives_version"] != OBJECTIVES_VERSION:
            errors.append(f"{label}: objectives_version must be {OBJECTIVES_VERSION}")
        try:
            weight = int(row["domain_weight_percent"])
            if not 0 < weight <= 100:
                raise ValueError
        except ValueError:
            errors.append(f"{label}: invalid domain_weight_percent")

    if set(objective_by_id) != EXPECTED_OBJECTIVES:
        missing = sorted(EXPECTED_OBJECTIVES - set(objective_by_id))
        extra = sorted(set(objective_by_id) - EXPECTED_OBJECTIVES)
        errors.append(f"objective-map.csv objective set mismatch; missing={missing}, extra={extra}")

    domain_weights: dict[str, int] = {}
    for row in objectives:
        domain_weights.setdefault(row["domain_id"], int(row["domain_weight_percent"]))
        if domain_weights[row["domain_id"]] != int(row["domain_weight_percent"]):
            errors.append(f"objective-map.csv: inconsistent weight for domain {row['domain_id']}")
    if sum(domain_weights.values()) != 100:
        errors.append(f"objective-map.csv: domain weights total {sum(domain_weights.values())}, expected 100")

    source_ids = {row["source_id"] for row in sources if row["source_id"]}
    if len(source_ids) != len(sources):
        errors.append("source-register.csv: blank or duplicate source_id")
    for index, row in enumerate(sources, start=2):
        if not row["organization"] or not row["title"] or not row["url"]:
            errors.append(f"source-register.csv row {index}: organization, title, and url are required")

    all_ids: dict[str, str] = {}
    all_stems: dict[str, str] = {}
    all_concepts: dict[str, str] = {}
    sequence_numbers: list[int] = []
    stored_rows: list[tuple[str, dict[str, str]]] = []

    for filename, rows in question_sets.items():
        allowed_status = FILE_STATUS[filename]
        for index, row in enumerate(rows, start=2):
            label = f"{filename} row {index}"
            stored_rows.append((label, row))
            qid = row.get("question_id", "")
            match = ID_RE.fullmatch(qid)
            if not match:
                errors.append(f"{label}: invalid question_id {qid!r}")
            else:
                sequence_numbers.append(int(match.group(1)))
            if qid in all_ids:
                errors.append(f"{label}: duplicate ID also found at {all_ids[qid]}")
            all_ids[qid] = label

            for field, expected in (
                ("test_id", TEST_ID),
                ("certification", CERTIFICATION),
                ("exam_version", EXAM_VERSION),
                ("objectives_version", OBJECTIVES_VERSION),
            ):
                if row.get(field) != expected:
                    errors.append(f"{label}: {field} must be {expected!r}")

            try:
                if int(row.get("question_version", "")) < 1:
                    raise ValueError
            except ValueError:
                errors.append(f"{label}: question_version must be a positive integer")

            if not BATCH_RE.fullmatch(row.get("batch_id", "")):
                errors.append(f"{label}: invalid batch_id")

            for field, allowed in ENUMS.items():
                if row.get(field) not in allowed:
                    errors.append(f"{label}: invalid {field} value {row.get(field)!r}")
            if row.get("review_status") not in allowed_status:
                errors.append(
                    f"{label}: review_status {row.get('review_status')!r} is not allowed in {filename}"
                )

            objective = objective_by_id.get(row.get("objective_id", ""))
            if not objective:
                errors.append(f"{label}: objective_id not found in objective-map.csv")
            else:
                for field in ("domain_id","domain_name","objective_text"):
                    if row.get(field) != objective.get(field):
                        errors.append(f"{label}: {field} does not match objective-map.csv")

            if not CONCEPT_RE.fullmatch(row.get("concept_key", "")):
                errors.append(f"{label}: concept_key must be lowercase kebab-case")

            required = [
                "question_id","test_id","certification","exam_version","objectives_version",
                "question_version","batch_id","domain_id","domain_name","objective_id",
                "objective_text","topic","concept_key","difficulty","question_type",
                "question_text","answer_a","answer_b","answer_c","answer_d",
                "correct_answers","correct_explanation","answer_a_explanation",
                "answer_b_explanation","answer_c_explanation","answer_d_explanation",
                "study_topics","source_ids","reference_notes","date_added",
                "date_modified","review_status",
            ]
            for field in required:
                if not row.get(field, "").strip():
                    errors.append(f"{label}: required field {field} is blank")

            added = parse_date(row.get("date_added", ""))
            modified = parse_date(row.get("date_modified", ""))
            reviewed = parse_date(row.get("date_reviewed", ""))
            for field, parsed in (("date_added", added), ("date_modified", modified)):
                if parsed is None:
                    errors.append(f"{label}: {field} must be a valid YYYY-MM-DD date")
            if row.get("date_reviewed") and reviewed is None:
                errors.append(f"{label}: date_reviewed must be a valid YYYY-MM-DD date")
            if added and modified and modified < added:
                errors.append(f"{label}: date_modified precedes date_added")
            if reviewed and added and reviewed < added:
                errors.append(f"{label}: date_reviewed precedes date_added")
            if reviewed and modified and reviewed < modified:
                warnings.append(f"{label}: date_reviewed precedes date_modified; re-review may be needed")

            if row.get("review_status") in {"review","approved"}:
                if not row.get("date_reviewed"):
                    errors.append(f"{label}: reviewed rows require date_reviewed")
                if not row.get("reviewer"):
                    errors.append(f"{label}: reviewed rows require reviewer")
            if row.get("review_status") == "approved" and row.get("quality_flags"):
                errors.append(f"{label}: approved rows must have blank quality_flags")

            choices = {letter: row.get(f"answer_{letter.lower()}", "").strip() for letter in "ABCD"}
            choice_norms = [normalized(value) for value in choices.values()]
            if any(not value for value in choices.values()):
                errors.append(f"{label}: all four answer choices must be populated")
            if len(set(choice_norms)) != 4:
                errors.append(f"{label}: answer choices must be distinct after normalization")
            clause_sigs = [reversed_clause_signature(value) for value in choices.values()]
            if len(set(clause_sigs)) != 4:
                errors.append(f"{label}: reversed-clause duplicate choices detected")

            correct = [part.strip() for part in row.get("correct_answers", "").split("|") if part.strip()]
            if any(letter not in {"A","B","C","D"} for letter in correct):
                errors.append(f"{label}: correct_answers contains an invalid stored key")
            if correct != sorted(set(correct)):
                errors.append(f"{label}: correct_answers must be sorted and unique")
            qtype = row.get("question_type")
            if qtype in {"single_choice","best_available"} and len(correct) != 1:
                errors.append(f"{label}: {qtype} requires exactly one correct answer")
            if qtype == "multi_select":
                if len(correct) < 2:
                    errors.append(f"{label}: multi_select requires at least two correct answers")
                if not row.get("question_instruction"):
                    errors.append(f"{label}: multi_select requires question_instruction")
            if qtype == "best_available" and not row.get("question_instruction"):
                errors.append(f"{label}: best_available requires question_instruction")

            position_fields = [row.get("question_text", ""), *choices.values()]
            if any(POSITION_RE.search(value) for value in position_fields):
                errors.append(f"{label}: position-dependent answer wording detected")

            listed_sources = [x for x in row.get("source_ids", "").split("|") if x]
            unknown = sorted(set(listed_sources) - source_ids)
            if unknown:
                errors.append(f"{label}: unknown source IDs: {', '.join(unknown)}")

            stem_norm = normalized(row.get("question_text", ""))
            if stem_norm:
                if stem_norm in all_stems:
                    errors.append(f"{label}: exact duplicate stem also found at {all_stems[stem_norm]}")
                all_stems[stem_norm] = label

            concept = row.get("concept_key", "")
            if concept:
                if concept in all_concepts:
                    warnings.append(f"{label}: duplicate concept_key also found at {all_concepts[concept]}")
                else:
                    all_concepts[concept] = label

            absolute_text = re.sub(
                r"\bmost completely\b",
                "",
                row.get("question_text", ""),
                flags=re.I,
            )
            if ABSOLUTE_RE.search(absolute_text):
                warnings.append(f"{label}: unsupported absolute may need review")

            if filename == "retired-questions.csv":
                if not row.get("retired_date") or not row.get("retirement_reason"):
                    errors.append(f"{label}: retired rows require retired_date and retirement_reason")
                retired = parse_date(row.get("retired_date", ""))
                if retired is None:
                    errors.append(f"{label}: retired_date must be a valid YYYY-MM-DD date")
                if retired and added and retired < added:
                    errors.append(f"{label}: retired_date precedes date_added")
                replacement = row.get("replacement_question_id", "")
                if replacement and not ID_RE.fullmatch(replacement):
                    errors.append(f"{label}: invalid replacement_question_id")

    for i, (label_a, row_a) in enumerate(stored_rows):
        stem_a = normalized(row_a.get("question_text", ""))
        if not stem_a:
            continue
        for label_b, row_b in stored_rows[i + 1:]:
            stem_b = normalized(row_b.get("question_text", ""))
            if not stem_b or stem_a == stem_b:
                continue
            ratio = difflib.SequenceMatcher(None, stem_a, stem_b).ratio()
            if ratio >= 0.88:
                warnings.append(
                    f"Near-duplicate stems ({ratio:.2f}): {label_a} and {label_b}"
                )

    if sequence_numbers:
        ordered = sorted(sequence_numbers)
        if ordered[0] != 1:
            warnings.append(f"Question sequence starts at {ordered[0]:07d}, not 0000001")
        gaps = [
            f"{a + 1:07d}-{b - 1:07d}" if b - a > 2 else f"{a + 1:07d}"
            for a, b in zip(ordered, ordered[1:])
            if b != a + 1
        ]
        if gaps:
            warnings.append("Question sequence contains gaps: " + ", ".join(gaps))

    answer_counts = Counter()
    domain_counts = Counter()
    difficulty_counts = Counter()
    type_counts = Counter()
    style_counts = Counter()
    for _, row in stored_rows:
        if row.get("review_status") == "approved" and row.get("question_id") in all_ids:
            for key in row.get("correct_answers", "").split("|"):
                if key:
                    answer_counts[key] += 1
            domain_counts[row.get("domain_id")] += 1
            difficulty_counts[row.get("difficulty")] += 1
            type_counts[row.get("question_type")] += 1
            style_counts[row.get("question_style")] += 1

    info.append(f"Objectives: {len(objectives)}")
    info.append(f"Registered sources: {len(sources)}")
    info.append(f"Question rows: {len(stored_rows)}")
    if STIMULI_FILE:
        info.append(f"Stimuli: {stimulus_count}")
    info.append(f"Approved answer-key counts: {dict(sorted(answer_counts.items()))}")
    info.append(f"Approved domain counts: {dict(sorted(domain_counts.items()))}")
    info.append(f"Approved difficulty counts: {dict(sorted(difficulty_counts.items()))}")
    info.append(f"Approved type counts: {dict(sorted(type_counts.items()))}")
    info.append(f"Approved style counts: {dict(sorted(style_counts.items()))}")

    return errors, warnings, info

def main() -> int:
    total_errors = 0
    total_warnings = 0

    for index, config in enumerate(BANK_CONFIGS):
        configure_bank(config)
        errors, warnings, info = validate()
        heading = f"{config['label']} QUESTION BANK VALIDATION"
        if index:
            print()
        print(heading)
        print("=" * len(heading))
        for line in info:
            print(f"INFO: {line}")
        for line in warnings:
            print(f"WARNING: {line}")
        for line in errors:
            print(f"ERROR: {line}")
        print("-" * len(heading))
        print(f"Errors: {len(errors)}")
        print(f"Warnings: {len(warnings)}")
        total_errors += len(errors)
        total_warnings += len(warnings)

    print()
    print(f"Validated question banks: {len(BANK_CONFIGS)}")
    print(f"Total errors: {total_errors}")
    print(f"Total warnings: {total_warnings}")
    return 1 if total_errors else 0

if __name__ == "__main__":
    raise SystemExit(main())
