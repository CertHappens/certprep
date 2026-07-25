export const COMPLETED_TEST_REPLACEMENT_MESSAGE =
  "Start a new randomized test? Your completed results will be replaced in this browser tab.";

export function confirmCompletedTestReplacement(confirmAction = globalThis.confirm) {
  if (typeof confirmAction !== "function") {
    throw new TypeError("A confirmation function is required.");
  }

  return Boolean(confirmAction(COMPLETED_TEST_REPLACEMENT_MESSAGE));
}
