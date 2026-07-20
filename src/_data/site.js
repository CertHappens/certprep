export default {
  name: "Cert Happens",
  shortName: "CertHappens.com",
  domainName: "CertHappens.com",
  tagline: "Practice. Review. Cert happens.",
  description:
    "Free certification practice tests with randomized sessions, detailed answer explanations, and focused study resources.",
  url: (process.env.SITE_URL || "https://certhappens.com").replace(/\/+$/, ""),
  language: "en",
  locale: "en_US",
  currentExam: {
    certification: "CompTIA Security+",
    projectTestId: "SEC-701",
    officialExamVersion: "SY0-701",
  },
};
