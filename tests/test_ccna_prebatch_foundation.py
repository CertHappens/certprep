from __future__ import annotations

import csv
import json
import sys
import tempfile
import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIRECTORY = PROJECT_ROOT / "scripts"

if str(SCRIPTS_DIRECTORY) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIRECTORY))

import validate_question_bank as validator  # noqa: E402


class CcnaPreBatchFoundationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.bank = PROJECT_ROOT / "data" / "ccna" / "200-301-v2"
        cls.config = next(
            config
            for config in validator.BANK_CONFIGS
            if config["test_id"] == "CCNA-301-V2"
        )

    def test_ccna_validator_identifiers_are_registered(self) -> None:
        self.assertEqual(self.config["exam_version"], "200-301 v2.0")
        self.assertEqual(self.config["objectives_version"], "2.0")
        self.assertEqual(self.config["stimuli_file"], "stimuli.json")
        self.assertEqual(self.config["responses_file"], "responses.json")
        self.assertRegex("CCNA301V2-0000001", self.config["id_pattern"])
        self.assertRegex("CCNA301V2-BATCH-001", self.config["batch_pattern"])

    def test_ccna_objective_map_contains_the_complete_published_id_set(self) -> None:
        with (self.bank / "objective-map.csv").open(encoding="utf-8", newline="") as handle:
            rows = list(csv.DictReader(handle))
        objective_ids = {row["objective_id"] for row in rows}
        self.assertEqual(objective_ids, set(self.config["expected_objectives"]))
        self.assertEqual(len(rows), 59)
        self.assertEqual(
            len([objective_id for objective_id in objective_ids if objective_id.count(".") == 1]),
            29,
        )
        weights = {}
        for row in rows:
            weights.setdefault(row["domain_id"], int(row["domain_weight_percent"]))
        self.assertEqual(weights, {"1.0": 25, "2.0": 25, "3.0": 20, "4.0": 20, "5.0": 10})

    def test_ccna_lifecycle_files_support_approved_batches(self) -> None:
        for filename in ("draft-questions.csv", "retired-questions.csv"):
            with (self.bank / filename).open(encoding="utf-8", newline="") as handle:
                rows = list(csv.reader(handle))
            self.assertEqual(len(rows), 1, filename)

        with (self.bank / "questions.csv").open(encoding="utf-8", newline="") as handle:
            questions = list(csv.DictReader(handle))

        self.assertGreater(len(questions), 0)
        question_ids = [row["question_id"] for row in questions]
        self.assertEqual(len(question_ids), len(set(question_ids)))
        self.assertTrue(all(row["review_status"] == "approved" for row in questions))

    def test_current_ccna_bank_passes_normal_validation(self) -> None:
        with (self.bank / "questions.csv").open(encoding="utf-8", newline="") as handle:
            question_count = sum(1 for _ in csv.DictReader(handle))

        stimulus_document = json.loads(
            (self.bank / "stimuli.json").read_text(encoding="utf-8")
        )
        stimulus_count = len(stimulus_document["stimuli"])

        self.assertGreater(question_count, 0)
        self.assertGreater(stimulus_count, 0)

        validator.configure_bank(self.config)
        errors, warnings, info = validator.validate()
        self.assertEqual(errors, [])
        self.assertEqual(warnings, [])
        self.assertIn("Objectives: 59", info)
        self.assertIn(f"Question rows: {question_count}", info)
        self.assertIn(f"Stimuli: {stimulus_count}", info)

    def test_unknown_ccna_stimulus_id_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            path = Path(temporary_directory) / "stimuli.json"
            path.write_text(
                json.dumps({
                    "schemaVersion": 1,
                    "stimuli": {
                        "CCNA301V2-0000001": {
                            "type": "preformatted",
                            "variant": "command_output",
                            "title": "Router output",
                            "content": "R1# show ip route",
                        }
                    },
                }),
                encoding="utf-8",
            )
            errors: list[str] = []
            count = validator.validate_stimulus_sidecar(path, set(), errors)
            self.assertEqual(count, 0)
            self.assertEqual(len(errors), 1)
            self.assertIn("unknown question IDs", errors[0])


    def test_structured_response_sidecar_is_validated_for_an_active_question(self) -> None:
        validator.configure_bank(self.config)
        question_id = "CCNA301V2-9999999"
        with tempfile.TemporaryDirectory() as temporary_directory:
            bank = Path(temporary_directory)
            (bank / "stimuli.json").write_text(
                json.dumps({"schemaVersion": 1, "stimuli": {}}),
                encoding="utf-8",
            )
            (bank / "responses.json").write_text(
                json.dumps({
                    "schemaVersion": 1,
                    "responses": {
                        question_id: {
                            "type": "matching",
                            "variant": "classification",
                            "items": [
                                {"id": "one", "text": "First", "correctOptionId": "category_a", "explanation": "First category."},
                                {"id": "two", "text": "Second", "correctOptionId": "category_a", "explanation": "Second category."},
                            ],
                            "options": [
                                {"id": "category_a", "label": "Category A"},
                                {"id": "category_b", "label": "Category B"},
                            ],
                        }
                    },
                }),
                encoding="utf-8",
            )
            errors: list[str] = []
            stimulus_count, response_count, _stimuli, responses = validator.validate_sidecars(
                bank,
                {
                    "questions.csv": [{"question_id": question_id, "question_type": "matching"}],
                    "draft-questions.csv": [],
                },
                errors,
            )
            self.assertEqual(errors, [])
            self.assertEqual(stimulus_count, 0)
            self.assertEqual(response_count, 1)
            self.assertEqual(responses[question_id]["variant"], "classification")

    def test_ccna_is_registered_in_the_public_quiz_catalog(self) -> None:
        catalog = json.loads(
            (PROJECT_ROOT / "config" / "quiz-catalog.json").read_text(encoding="utf-8")
        )
        registered = {quiz["slug"]: quiz for quiz in catalog["quizzes"]}
        self.assertIn("ccna/200-301-v2", registered)
        self.assertEqual(len(registered), 3)

        ccna = registered["ccna/200-301-v2"]
        self.assertEqual(ccna["questions_csv"], "data/ccna/200-301-v2/questions.csv")
        self.assertEqual(ccna["objective_map_csv"], "data/ccna/200-301-v2/objective-map.csv")
        self.assertEqual(ccna["stimuli_json"], "data/ccna/200-301-v2/stimuli.json")
        self.assertEqual(ccna["responses_json"], "data/ccna/200-301-v2/responses.json")
        self.assertEqual(ccna["public_base_path"], "/quiz-data/ccna/200-301-v2")
        self.assertEqual(ccna["practice_test_path"], "/ccna/200-301-v2/practice-test")
        self.assertEqual(ccna["question_count_options"], [10, 20, 30, 50])
        self.assertEqual(ccna["preferred_default_question_count"], 30)


if __name__ == "__main__":
    unittest.main()
