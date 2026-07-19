from __future__ import annotations

import json
import sys
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIRECTORY = PROJECT_ROOT / "scripts"

if str(SCRIPTS_DIRECTORY) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIRECTORY))

from build_quiz_data import (  # noqa: E402
    BuildError,
    build_public_question,
    build_quiz,
    calculate_question_count_settings,
    canonical_hash,
    read_csv,
    stable_answer_id,
)


class QuizDataBuilderTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.questions_path = (
            PROJECT_ROOT / "data" / "security-plus" / "sec-701" / "questions.csv"
        )
        cls.rows = read_csv(cls.questions_path)
        cls.quiz_config = {
            "slug": "security-plus/sec-701",
            "questions_csv": "data/security-plus/sec-701/questions.csv",
            "objective_map_csv": "data/security-plus/sec-701/objective-map.csv",
            "output_directory": "src/quiz-data/security-plus/sec-701",
            "public_base_path": "/quiz-data/security-plus/sec-701",
            "question_count_options": [10, 20, 30, 50],
            "preferred_default_question_count": 30,
        }

    def test_stable_answer_identity_does_not_depend_on_display_position(self) -> None:
        self.assertEqual(
            stable_answer_id("SEC701-0000001", "B"),
            "SEC701-0000001:B",
        )

    def test_public_question_converts_correct_key_to_answer_identity(self) -> None:
        question = build_public_question(self.rows[0])

        self.assertEqual(
            question["correctAnswerIds"],
            ["SEC701-0000001:B"],
        )
        self.assertEqual(
            question["answers"][1]["id"],
            "SEC701-0000001:B",
        )

    def test_public_question_excludes_internal_editorial_fields(self) -> None:
        question = build_public_question(self.rows[0])
        prohibited_fields = {
            "batch_id",
            "concept_key",
            "source_ids",
            "reference_notes",
            "review_status",
            "reviewer",
            "quality_flags",
            "author_notes",
            "date_added",
            "date_modified",
            "date_reviewed",
        }

        self.assertTrue(prohibited_fields.isdisjoint(question.keys()))

    def test_ten_question_bank_enables_only_ten(self) -> None:
        options, default_count = calculate_question_count_settings(
            10,
            [10, 20, 30, 50],
            30,
        )

        self.assertEqual(options, [10])
        self.assertEqual(default_count, 10)

    def test_larger_bank_uses_preferred_default(self) -> None:
        options, default_count = calculate_question_count_settings(
            38,
            [10, 20, 30, 50],
            30,
        )

        self.assertEqual(options, [10, 20, 30])
        self.assertEqual(default_count, 30)

    def test_hash_is_deterministic(self) -> None:
        payload = {"b": [2, 3], "a": 1}

        self.assertEqual(
            canonical_hash(payload),
            canonical_hash(deepcopy(payload)),
        )

    def test_unapproved_active_row_is_rejected(self) -> None:
        row = deepcopy(self.rows[0])
        row["review_status"] = "review"

        with self.assertRaises(BuildError):
            build_public_question(row)

    def test_single_choice_rejects_multiple_correct_answers(self) -> None:
        row = deepcopy(self.rows[0])
        row["correct_answers"] = "A|B"

        with self.assertRaises(BuildError):
            build_public_question(row)

    def test_current_bank_builds_all_public_questions(self) -> None:
        expected_question_count = len(self.rows)
        expected_options, expected_default = calculate_question_count_settings(
            expected_question_count,
            self.quiz_config["question_count_options"],
            self.quiz_config["preferred_default_question_count"],
        )

        with tempfile.TemporaryDirectory() as temporary_directory:
            output_directory = Path(temporary_directory)

            manifest, catalog_entry = build_quiz(
                self.quiz_config,
                project_root=PROJECT_ROOT,
                output_directory_override=output_directory,
                generated_at="2026-07-19T12:00:00Z",
            )

            self.assertEqual(
                manifest["availableQuestionCount"],
                expected_question_count,
            )
            self.assertEqual(
                manifest["questionCountOptions"],
                expected_options,
            )
            self.assertEqual(
                manifest["defaultQuestionCount"],
                expected_default,
            )
            self.assertEqual(
                catalog_entry["questionsFile"],
                "/quiz-data/security-plus/sec-701/questions.json",
            )

            with (output_directory / "questions.json").open(
                "r",
                encoding="utf-8",
            ) as handle:
                question_payload = json.load(handle)

            self.assertEqual(
                question_payload["questionCount"],
                expected_question_count,
            )
            self.assertEqual(
                len(question_payload["questions"]),
                expected_question_count,
            )


if __name__ == "__main__":
    unittest.main()
