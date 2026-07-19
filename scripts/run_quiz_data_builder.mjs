import { fileURLToPath } from "node:url";
import path from "node:path";
import { runPython } from "./python_runner.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const builderPath = path.join(scriptDirectory, "build_quiz_data.py");
const forwardedArguments = process.argv.slice(2);

process.exit(runPython([builderPath, ...forwardedArguments]));
