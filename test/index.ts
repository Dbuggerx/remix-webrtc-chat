import path from "path";

(async () => {
  const createTestCafe = (await import("testcafe")).default;

  const testcafe = await createTestCafe({
    hostname: "localhost",
  });

  await testcafe
    .createRunner()
    .src([path.join(import.meta.dirname, "tests/**/*")])
    .browsers("chrome")
    .run({ disableNativeAutomation: true });
    // .run();

  await testcafe.close();
})();
