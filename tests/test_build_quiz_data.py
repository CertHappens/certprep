from __future__ import annotations

import csv
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
    normalize_question_response,
    normalize_question_stimulus,
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
            "practice_test_path": "/security-plus/sy0-701/practice-test",
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

    def test_normalizes_supported_question_stimuli(self) -> None:
        preformatted = normalize_question_stimulus(
            "SEC701-0000001",
            {
                "type": "preformatted",
                "variant": "configuration",
                "title": "Firewall configuration",
                "content": "  line 1\r\n    line 2\n",
            },
        )
        self.assertEqual(preformatted["content"], "  line 1\n    line 2")

        table = normalize_question_stimulus(
            "SEC701-0000001",
            {
                "type": "table",
                "title": "Evidence",
                "columns": [{"key": "host", "label": "Host"}],
                "rows": [{"host": "server-1"}],
            },
        )
        self.assertEqual(table["rows"][0]["host"], "server-1")

    def test_rejects_invalid_question_stimulus(self) -> None:
        with self.assertRaises(BuildError):
            normalize_question_stimulus(
                "SEC701-0000001",
                {
                    "type": "table",
                    "title": "Evidence",
                    "columns": [{"key": "host", "label": "Host"}],
                    "rows": [{"different": "server-1"}],
                },
            )

    def test_optional_stimulus_sidecar_is_added_to_public_snapshot(self) -> None:
        question_id = self.rows[0]["question_id"]
        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary = Path(temporary_directory)
            stimuli_path = temporary / "stimuli.json"
            stimuli_path.write_text(
                json.dumps({
                    "schemaVersion": 1,
                    "stimuli": {
                        question_id: {
                            "type": "preformatted",
                            "variant": "log",
                            "title": "Event log",
                            "content": "event one\nevent two",
                        }
                    },
                }),
                encoding="utf-8",
            )
            config = deepcopy(self.quiz_config)
            config["stimuli_json"] = str(stimuli_path)
            output_directory = temporary / "output"
            build_quiz(
                config,
                project_root=PROJECT_ROOT,
                output_directory_override=output_directory,
                generated_at="2026-08-01T12:00:00Z",
            )
            payload = json.loads((output_directory / "questions.json").read_text(encoding="utf-8"))
            built = next(question for question in payload["questions"] if question["id"] == question_id)
            self.assertEqual(built["stimulus"]["variant"], "log")
            unstimulated = next(question for question in payload["questions"] if question["id"] != question_id)
            self.assertNotIn("stimulus", unstimulated)


    def test_normalizes_matching_classification_and_ordering_responses(self) -> None:
        matching = normalize_question_response(
            "SEC701-9000001",
            {
                "type": "matching",
                "variant": "classification",
                "items": [
                    {"id": "first", "text": "First item", "correctOptionId": "category_a", "explanation": "First explanation."},
                    {"id": "second", "text": "Second item", "correctOptionId": "category_a", "explanation": "Second explanation."},
                ],
                "options": [
                    {"id": "category_a", "label": "Category A"},
                    {"id": "category_b", "label": "Category B"},
                ],
            },
        )
        self.assertEqual(matching["variant"], "classification")
        self.assertEqual(matching["items"][1]["correctOptionId"], "category_a")

        ordering = normalize_question_response(
            "SEC701-9000002",
            {
                "type": "ordering",
                "items": [
                    {"id": "one", "text": "Step one", "explanation": "First."},
                    {"id": "two", "text": "Step two", "explanation": "Second."},
                    {"id": "three", "text": "Step three", "explanation": "Third."},
                ],
                "correctOrder": ["one", "two", "three"],
            },
        )
        self.assertEqual(ordering["correctOrder"], ["one", "two", "three"])

    def test_line_select_response_requires_nonblank_preformatted_stimulus_lines(self) -> None:
        stimulus = normalize_question_stimulus(
            "SEC701-9000003",
            {
                "type": "preformatted",
                "variant": "configuration",
                "title": "Configuration",
                "content": "line one\nline two\n\nline four",
            },
        )
        response = normalize_question_response(
            "SEC701-9000003",
            {"type": "line_select", "selectionCount": 2, "correctLineNumbers": [2, 4]},
            stimulus=stimulus,
        )
        self.assertEqual(response["correctLineNumbers"], [2, 4])

        with self.assertRaises(BuildError):
            normalize_question_response(
                "SEC701-9000003",
                {"type": "line_select", "selectionCount": 1, "correctLineNumbers": [3]},
                stimulus=stimulus,
            )

    def test_public_structured_question_uses_response_sidecar_instead_of_answer_choices(self) -> None:
        row = deepcopy(self.rows[0])
        row["question_type"] = "matching"
        row["question_instruction"] = "Match each item to its category."
        for field in (
            "answer_a", "answer_b", "answer_c", "answer_d", "correct_answers",
            "answer_a_explanation", "answer_b_explanation",
            "answer_c_explanation", "answer_d_explanation",
        ):
            row[field] = ""
        response = normalize_question_response(
            row["question_id"],
            {
                "type": "matching",
                "variant": "matching",
                "items": [
                    {"id": "first", "text": "First item", "correctOptionId": "one", "explanation": "First maps to one."},
                    {"id": "second", "text": "Second item", "correctOptionId": "two", "explanation": "Second maps to two."},
                ],
                "options": [
                    {"id": "one", "label": "One"},
                    {"id": "two", "label": "Two"},
                ],
            },
        )
        question = build_public_question(row, response=response)
        self.assertEqual(question["type"], "matching")
        self.assertEqual(question["response"]["variant"], "matching")
        self.assertNotIn("answers", question)
        self.assertNotIn("correctAnswerIds", question)

    def test_structured_question_rejects_leftover_choice_fields(self) -> None:
        row = deepcopy(self.rows[0])
        row["question_type"] = "ordering"
        row["question_instruction"] = "Place the steps in order."
        response = normalize_question_response(
            row["question_id"],
            {
                "type": "ordering",
                "items": [
                    {"id": "one", "text": "One", "explanation": "First."},
                    {"id": "two", "text": "Two", "explanation": "Second."},
                    {"id": "three", "text": "Three", "explanation": "Third."},
                ],
                "correctOrder": ["one", "two", "three"],
            },
        )
        with self.assertRaises(BuildError):
            build_public_question(row, response=response)


    def test_build_quiz_loads_a_structured_response_sidecar(self) -> None:
        row = deepcopy(self.rows[0])
        row["question_type"] = "matching"
        row["question_instruction"] = "Match each item to its category."
        for field in (
            "answer_a", "answer_b", "answer_c", "answer_d", "correct_answers",
            "answer_a_explanation", "answer_b_explanation",
            "answer_c_explanation", "answer_d_explanation",
        ):
            row[field] = ""

        with tempfile.TemporaryDirectory() as temporary_directory:
            temporary = Path(temporary_directory)
            questions_path = temporary / "questions.csv"
            with questions_path.open("w", encoding="utf-8", newline="") as handle:
                writer = csv.DictWriter(handle, fieldnames=list(row))
                writer.writeheader()
                writer.writerow(row)

            responses_path = temporary / "responses.json"
            responses_path.write_text(
                json.dumps({
                    "schemaVersion": 1,
                    "responses": {
                        row["question_id"]: {
                            "type": "matching",
                            "variant": "matching",
                            "items": [
                                {"id": "first", "text": "First item", "correctOptionId": "one", "explanation": "First maps to one."},
                                {"id": "second", "text": "Second item", "correctOptionId": "two", "explanation": "Second maps to two."},
                            ],
                            "options": [
                                {"id": "one", "label": "One"},
                                {"id": "two", "label": "Two"},
                            ],
                        }
                    },
                }),
                encoding="utf-8",
            )

            config = deepcopy(self.quiz_config)
            config["questions_csv"] = str(questions_path)
            config["responses_json"] = str(responses_path)
            config["question_count_options"] = [1]
            config["preferred_default_question_count"] = 1
            output_directory = temporary / "output"

            manifest, _ = build_quiz(
                config,
                project_root=PROJECT_ROOT,
                output_directory_override=output_directory,
                generated_at="2026-08-07T12:00:00Z",
            )
            payload = json.loads((output_directory / "questions.json").read_text(encoding="utf-8"))
            built = payload["questions"][0]
            self.assertEqual(manifest["questionTypes"], ["matching"])
            self.assertEqual(built["response"]["type"], "matching")
            self.assertNotIn("answers", built)
            self.assertNotIn("correctAnswerIds", built)

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
            self.assertEqual(
                manifest["test"]["practiceTestPath"],
                "/security-plus/sy0-701/practice-test",
            )
            self.assertEqual(
                catalog_entry["test"]["practiceTestPath"],
                "/security-plus/sy0-701/practice-test",
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
