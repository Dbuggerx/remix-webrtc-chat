import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";
import bcrypt from "bcryptjs";
import { createUser, findUserByUsername } from "./db-mock.server";

const isProduction = process.env.NODE_ENV === "production";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set (use a .env file)!");
}

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme_session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [sessionSecret],
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: isProduction,
  },
});
export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);

const userStorage = createCookieSessionStorage({
  cookie: {
    name: "user_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

type LoginForm = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginForm) {
  const user = await findUserByUsername(username);
  if (!user) {
    return null;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, username };
}

export async function register({ password, username }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser(username, passwordHash);
  console.log({ user });
  return { id: user.id, username };
}

type User = { id: string; username: string };
export async function createUserSession(
  user: User,
  redirectTo: string,
) {
  const session = await userStorage.getSession();
  session.set("user", user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await userStorage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return userStorage.getSession(request.headers.get("Cookie"));
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const user: User | undefined = session.get("user");
  if (!user) {
    throw await logout(request);
  }

  return user;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await userStorage.destroySession(session),
    },
  });
}
