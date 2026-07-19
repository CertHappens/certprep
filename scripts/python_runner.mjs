import { spawnSync } from "node:child_process";

/**
 * Run Python 3 with cross-platform command discovery.
 *
 * Windows commonly exposes Python as `py -3` or `python`.
 * Linux build environments commonly expose it as `python3`.
 */
export function runPython(argumentsToForward) {
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
      [...candidate.prefix, ...argumentsToForward],
      { stdio: "inherit" }
    );

    if (result.error?.code === "ENOENT") {
      continue;
    }

    if (result.error) {
      console.error(`Unable to run ${candidate.command}: ${result.error.message}`);
      return 1;
    }

    return result.status ?? 1;
  }

  console.error(
    "Python 3 was not found. Install Python 3 and make it available as py, python, or python3."
  );
  return 1;
}
