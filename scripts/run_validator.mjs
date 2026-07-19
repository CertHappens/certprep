import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const validatorPath = path.join(scriptDirectory, "validate_question_bank.py");
const forwardedArguments = process.argv.slice(2);

const candidates = process.platform === "win32"
  ? [
      { command: "py", prefix: ["-3"] },
      { command: "python", prefix: [] },
      { command: "python3", prefix: [] }
    ]
  : [
      { command: "python3", prefix: [] },
      { command: "python", prefix: [] }
    ];

for (const candidate of candidates) {
  const result = spawnSync(
    candidate.command,
    [...candidate.prefix, validatorPath, ...forwardedArguments],
    { stdio: "inherit" }
  );

  if (result.error?.code === "ENOENT") {
    continue;
  }

  if (result.error) {
    console.error(`Unable to run ${candidate.command}: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

console.error("Python 3 was not found. Install Python 3 and make it available as py, python, or python3.");
process.exit(1);
