module.exports = {
  clientScripts: [
    { module: "@testing-library/dom/dist/@testing-library/dom.umd.js" },
  ],
  baseUrl: "http://localhost:3000",
  src: "test/tests/**/*.ts",
  browsers: ["chrome"],
  disableNativeAutomation: true,
  skipJsErrors: false,
  disableScreenshots: true,
  screenshots: {
    path: "./test/screenshots",
    // @see: https://testcafe.io/documentation/402840/guides/intermediate-guides/screenshots-and-videos?search#path-pattern-placeholders
    pathPattern: "${BROWSER}/${FIXTURE}-${TEST}-${FILE_INDEX}.png",
    pathPatternOnFails:
      "failedTests/${DATE}_${TIME}/${FIXTURE}-${TEST}-${USERAGENT}-${FILE_INDEX}.png",
    takeOnFails: true,
    thumbnails: false,
  },
  videoPath: "./test/videos",
  videoOptions: {
    singleFile: false,
    failedOnly: true,
    pathPattern:
      "failedTests/${DATE}_${TIME}/${FIXTURE}-${TEST}-${USERAGENT}-${FILE_INDEX}.mp4",
  },
};
