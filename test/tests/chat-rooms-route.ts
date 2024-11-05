import { screen, within } from "@testing-library/testcafe";
import testRole from "../roles/test-role";
import { ClientFunction, Selector } from "testcafe";

fixture("Chat rooms route").beforeEach(async (t) => {
  await t.useRole(testRole).navigateTo("./chat/rooms");
});

const getWindowLocation = ClientFunction(() => window.location);

test("can see the list of rooms", async (t) => {
  const rows = Selector("table tr").withText('Room');
  await t.expect(rows.count).eql(10);
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
