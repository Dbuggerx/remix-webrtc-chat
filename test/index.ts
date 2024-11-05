import createTestCafe from "testcafe";
import { compareScreenshots, getVrtConfig } from "./compare-imgs.js";

const isApprovingVRTs = process.env.VRT_APPROVE === "true";
const testcafe = await createTestCafe({
  ...getVrtConfig(isApprovingVRTs),
  configFile: process.env.CONFIG_FILE,
});
const runner = testcafe.createRunner();
const failedCount = await runner.run();

if (failedCount === 0 && !isApprovingVRTs) await compareScreenshots();

await testcafe.close();
