export default {
  name: "Cert Prep",
  shortName: "Cert Prep",
  description: "Free certification practice tests and focused study resources.",
  url: (process.env.SITE_URL || "").replace(/\/+$/, ""),
  language: "en",
  locale: "en_US",
  currentExam: {
    certification: "CompTIA Security+",
    projectTestId: "SEC-701",
    officialExamVersion: "SY0-701"
  }
};
