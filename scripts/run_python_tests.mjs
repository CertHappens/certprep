import { runPython } from "./python_runner.mjs";

process.exit(
  runPython([
    "-m",
    "unittest",
    "discover",
    "-s",
    "tests",
    "-p",
    "test_*.py",
    "-v"
  ])
);
