import type { ActionFunctionArgs } from "@remix-run/node";
import { findUserByUsername } from "~/utils/db-mock.server";
import { badRequest } from "~/utils/request.server";
import { login, createUserSession, register } from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const password = form.get("password");
  const username = form.get("username");
  const redirectTo = validateUrl((form.get("redirectTo") as string) || "/chat");
  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { loginType, password, username };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Username/Password combination is incorrect",
        });
      }
      return createUserSession(user, redirectTo);
    }
    case "register": {
      const userExists = await findUserByUsername(username);
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Something went wrong trying to create a new user.",
        });
      }
      return createUserSession(user, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export function validateUsername(username: string) {
  if (username.length < 3) {
    return "Usernames must be at least 3 characters long";
  }
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return "Passwords must be at least 6 characters long";
  }
}

export function validateUrl(url: string) {
  const urls = ["/chat", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/chat";
}
