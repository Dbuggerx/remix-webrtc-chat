module.exports = {
  clientScripts: [
    { module: "@testing-library/dom/dist/@testing-library/dom.umd.js" },
  ],
  baseUrl: "http://localhost:3000",
  src: "test/tests/**/*.ts",
  browsers: ["chrome"],
  disableNativeAutomation: true,
  skipJsErrors: false,
};
