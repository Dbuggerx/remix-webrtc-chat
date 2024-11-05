import { ClientFunction } from "testcafe";

/**
 * Used to remove the random numbers from the username, making visual regression tests deterministic
 */
export default ClientFunction(() => {
  const userNameElement = document.querySelector('[aria-label="Current user"]');
  if (!userNameElement?.textContent)
    throw new Error("username element not found!");

  userNameElement.textContent = userNameElement.textContent.replace(/\d/g, "");
});
