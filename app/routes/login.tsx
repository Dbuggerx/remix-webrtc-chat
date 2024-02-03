import type { MetaFunction } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AlertCircle, MessageCircleMore } from "lucide-react";
import { ThemeModeToggle } from "~/components/theme-mode-toggle";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat" }];
};

export default function Index() {
  const [title, setTitle] = React.useState("Sign in to your account");

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gray-100 py-12 dark:bg-gray-800 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="flex items-center justify-center gap-3 text-lg">
          <MessageCircleMore className="size-10 @xxs:size-6" />
          Remix WebRTC Chat
          <ThemeModeToggle />
        </p>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow dark:bg-gray-700 sm:rounded-lg sm:px-10">
          <form className="space-y-6" method="POST">
            <RadioGroup
              defaultValue="Login"
              orientation="horizontal"
              name="loginType"
              className="justify-center gap-12"
              onValueChange={(value) => {
                setTitle(
                  value === "Login"
                    ? "Sign in to your account"
                    : "Create an account",
                );
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Login" id="loginOpt" />
                <Label htmlFor="loginOpt">Login</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Register" id="registerOpt" />
                <Label htmlFor="registerOpt">Register</Label>
              </div>
            </RadioGroup>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                autoComplete="username"
                className="mt-1 block w-full"
                id="username"
                name="username"
                placeholder="Username"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="current-password"
                className="mt-1 block w-full"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
            <div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
            <Alert
              variant="destructive"
              className="dark:bg-slate-950 dark:font-bold"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Description</AlertDescription>
            </Alert>
          </form>
        </div>
      </div>
    </div>
  );
}
