import { screen } from "@testing-library/testcafe";
import testRole from "../roles/test-role";
import { ClientFunction } from "testcafe";

fixture("Home route").beforeEach(async (t) => {
  await t.useRole(testRole).navigateTo("./chat");
});

test("side panel is visible", async (t) => {
  await t.expect(screen.findByRole("complementary").visible).ok();
});

const getWindowLocation = ClientFunction(() => window.location);

test("can see the list of rooms", async (t) => {
  await t.click(
    screen.getByRole("link", {
      name: /chat rooms/i,
    }),
  );

  const location = await getWindowLocation();
  await t.expect(location.pathname).eql("/chat/rooms");
});
