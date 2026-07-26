const googleAnalyticsMeasurementId = "G-7MYVYMG2H1";
const isProductionBuild = process.env.CF_PAGES_BRANCH === "main";

export default {
  turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || "",
  googleAnalyticsMeasurementId: isProductionBuild
    ? googleAnalyticsMeasurementId
    : "",
  isProductionBuild
};
