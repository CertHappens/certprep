const canonicalUrl = "https://certhappens.com";
const canonicalHost = "certhappens.com";

export default {
  name: "Cert Happens",
  shortName: "CertHappens.com",
  domainName: "CertHappens.com",
  tagline: "Practice. Review. Cert happens.",
  description:
    "Certification practice tests with randomized sessions, detailed answer explanations, and focused study resources.",
  url: canonicalUrl,
  canonicalHost,
  analyticsHosts: [canonicalHost, `www.${canonicalHost}`],
  copyrightStartYear: 2026,
  language: "en",
  locale: "en_US",
  contactAddress: "contact [at] certhappens [dot] com",
  privacyAddress: "privacy [at] certhappens [dot] com",
  logoPath: "/assets/brand/favicon-512-v2.png",
  socialImagePath: "/assets/brand/certhappens-social-card.png",
  socialImageWidth: 1200,
  socialImageHeight: 630,
  currentExam: {
    certification: "CompTIA Security+",
    projectTestId: "SEC-701",
    officialExamVersion: "SY0-701"
  }
};
