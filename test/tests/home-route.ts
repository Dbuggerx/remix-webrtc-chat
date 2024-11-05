import { screen } from "@testing-library/testcafe";
import testRole from "../roles/test-role";
import getWindowLocation from "../client-functions/get-window-location";
import removeNumbersFromUsername from "../client-functions/remove-numbers-from-username";

fixture("Home route")
  .beforeEach(async (t) => {
    await t.useRole(testRole).navigateTo("./chat");
  })
  .afterEach(async (t) => {
    if (t.test.name.includes("can navigate")) return;
    await removeNumbersFromUsername();
    await t.takeScreenshot();
  });

test("side panel is visible", async (t) => {
  await t.expect(screen.findByRole("complementary").visible).ok();
});

test("can navigate to chat room route", async (t) => {
  await t.click(
    screen.getByRole("link", {
      name: /chat rooms/i,
    }),
  );

  const location = await getWindowLocation();
  await t.expect(location.pathname).eql("/chat/rooms");
});
