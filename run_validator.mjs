import { fileURLToPath } from "node:url";
import path from "node:path";
import { runPython } from "./python_runner.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const validatorPath = path.join(scriptDirectory, "validate_question_bank.py");
const forwardedArguments = process.argv.slice(2);

process.exit(runPython([validatorPath, ...forwardedArguments]));
