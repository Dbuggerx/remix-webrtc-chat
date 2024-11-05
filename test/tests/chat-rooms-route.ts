import { screen, within } from "@testing-library/testcafe";
import { Selector } from "testcafe";
import testRole from "../roles/test-role";
import getWindowLocation from "../client-functions/get-window-location";
import removeNumbersFromUsername from "../client-functions/remove-numbers-from-username";
import maskElement from "../client-functions/mask-element";

fixture("Chat rooms route")
  .beforeEach(async (t) => {
    await t.useRole(testRole).navigateTo("./chat/rooms");
  })
  .afterEach(async (t) => {
    await removeNumbersFromUsername();
    await t.takeScreenshot();
  });

test("can see the list of rooms", async (t) => {
  const rows = Selector("main table tr").withText(/^Room/);
  await t.expect(rows.count).gte(10);

  // Mask user count cells
  for (let i = 0; i < (await rows.count); i++)
    await maskElement(await rows.nth(i).child("td:nth-child(2)")());
});

test("can join a room", async (t) => {
  const tableRow = screen.getByRole("row", {
    name: /room 1 \d{1,} join/i,
  });

  const joinButton = within(tableRow).getByRole("button", {
    name: /join/i,
  });

  await t.click(joinButton);

  const location = await getWindowLocation();
  await t.expect(location.pathname).eql("/chat/rooms/Room%201");
});
