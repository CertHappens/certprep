import fs from "node:fs";
import path from "node:path";

const catalogPath = path.join(process.cwd(), "src", "quiz-data", "catalog.json");

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
} catch (error) {
  throw new Error(
    `Generated quiz catalog is unavailable at ${catalogPath}. Run npm run build:data before Eleventy. ${error.message}`
  );
}

export default {
  ...catalog,
  currentQuiz: catalog.quizzes[0],
  byTestId: Object.fromEntries(
    catalog.quizzes.map((quiz) => [quiz.test.testId, quiz])
  )
};
