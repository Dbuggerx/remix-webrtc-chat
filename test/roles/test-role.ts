import { Role } from "testcafe";
import { screen } from "@testing-library/testcafe";

export default Role(
  "./login",
  async (t) => {
    const randomNumber = Math.ceil(Math.random() * 1000);

    await t
      .click(screen.getByText(/register/i))
      .typeText(
        screen.getByRole("textbox", {
          name: /username/i,
        }),
        `TestUser${randomNumber}`,
      )
      .typeText(screen.getByLabelText(/password/i), `testpass${randomNumber}`)
      .click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );
  },
  { preserveUrl: true },
);
