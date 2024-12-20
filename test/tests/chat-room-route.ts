import { screen } from "@testing-library/testcafe";
import testRole from "../roles/test-role";
import removeNumbersFromUsername from "../client-functions/remove-numbers-from-username";

fixture("Chat room route")
  .beforeEach(async (t) => {
    await t.useRole(testRole).navigateTo("./chat/rooms/Room%201");
  })
  .afterEach(async (t) => {
    await removeNumbersFromUsername();
    await t.takeScreenshot();
  });

test("can send a chat message by clicking the send button", async (t) => {
  const chatMessage = "test message!";

  await t.typeText(screen.findByRole("textbox"), chatMessage).click(
    screen.getByRole("button", {
      name: /send message/i,
    }),
  );

  const sentChatMsg = screen.getAllByRole("log").withText(chatMessage);

  await t.expect(sentChatMsg.exists).ok();

  const currentDate = new Date().toLocaleDateString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });
  await t.expect(sentChatMsg.textContent).match(new RegExp(currentDate));
});

test("can send a chat message by pressing enter", async (t) => {
  const chatMessage = "test message!";
  const textbox = screen.findByRole("textbox");

  await t.typeText(textbox, chatMessage);
  await t.pressKey("enter");

  const sentChatMsg = screen.getAllByRole("log").withText(chatMessage);

  await t.expect(sentChatMsg.exists).ok();

  const currentDate = new Date().toLocaleDateString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });
  await t.expect(sentChatMsg.textContent).match(new RegExp(currentDate));

  await t.click(sentChatMsg);
});
