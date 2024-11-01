import type { MetaFunction } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import React from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AlertCircle, MessageCircleMore } from "lucide-react";
import { ThemeModeToggle } from "~/components/theme-mode-toggle";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Card, CardContent } from "~/components/ui/card";
import type { action } from "./action";
export { action } from "./action";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat" }];
};

export default function LoginRoute() {
  const [title, setTitle] = React.useState("Sign in to your account");
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

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
      <div className="mt-8 p-2 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent>
            <form className="space-y-6 text-left" method="POST" noValidate>
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") ?? undefined}
              />
              <RadioGroup
                defaultValue="login"
                orientation="horizontal"
                name="loginType"
                className="justify-center gap-12"
                onValueChange={(value) => {
                  setTitle(
                    value === "login"
                      ? "Sign in to your account"
                      : "Create an account",
                  );
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="login"
                    id="loginOpt"
                    aria-labelledby="login-label"
                    defaultChecked={
                      !actionData?.fields?.loginType ||
                      actionData?.fields?.loginType === "login"
                    }
                  />
                  <Label htmlFor="loginOpt" id="login-label">
                    Login
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="register"
                    id="registerOpt"
                    aria-labelledby="register-label"
                    defaultChecked={
                      actionData?.fields?.loginType === "register"
                    }
                  />
                  <Label htmlFor="registerOpt" id="register-label">
                    Register
                  </Label>
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
                  defaultValue={actionData?.fields?.username}
                  aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                  aria-errormessage={
                    actionData?.fieldErrors?.username
                      ? "username-error"
                      : undefined
                  }
                />
                {actionData?.fieldErrors?.username ? (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {actionData.fieldErrors.username}
                    </AlertDescription>
                  </Alert>
                ) : null}
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
                  defaultValue={actionData?.fields?.password}
                  aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                  aria-errormessage={
                    actionData?.fieldErrors?.password
                      ? "password-error"
                      : undefined
                  }
                />
                {actionData?.fieldErrors?.password ? (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {actionData.fieldErrors.password}
                    </AlertDescription>
                  </Alert>
                ) : null}
              </div>
              <div id="form-error-message">
                {actionData?.formError ? (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{actionData.formError}</AlertDescription>
                  </Alert>
                ) : null}
              </div>
              <div>
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
