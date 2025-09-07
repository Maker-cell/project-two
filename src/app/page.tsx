"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { UserResponse } from "@/lib/validator";
import { useFetch } from "@/lib/requests";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { data, error } = useFetch<UserResponse>("https://dummyjson.com/users");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) {
      setLoginError(`${error.message}`);
      return;
    }
    if (email.length < 3 || password.length < 8) {
      setLoginError("Invalid email or password.");
      return;
    }

    if (data) {
      const confirm = data?.users.find(
        (user) => user.email === email && user.password !== password
      );
      const confirmed = data?.users.find(
        (user) => user.email === email && user.password === password
      );
      if (confirm) {
        setLoginError("Incorrect password, please enter a valid password.");
        return;
      }

      if (confirmed) {
        setLoginError("");
        window.location.href = "https://www.crunchyroll.com/";
      } else {
        setLoginError("Account does not exist, please create a new account.");
      }
    }
  };
  return (
    <>
      <div className="sticky top-4 right-8 m-6 flex justify-end z-50">
        <ModeToggle />
      </div>
      <h1 className="flex justify-center m-[-60] text-3xl font-[monotype-corsiva] mb-[-80] font-bold">
        Lumora
      </h1>
      <div className="w-screen h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <form onSubmit={onSubmit}>
            <CardHeader>
              <CardTitle className="justify-center flex font-bold">
                Login to your account
              </CardTitle>
              <CardDescription className="text-center px-6 pt-2 mb-6">
                Enter your email and password below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError("");
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password:</Label>
                    <Link
                      href="/forgot-password/via-mail"
                      className="text-xs text-muted-foreground ml-auto inline-block underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError("");
                    }}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full cursor-pointer mt-6 mb-3">
                Login
              </Button>

              <p className="text-xs">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-muted-foreground hover:underline"
                >
                  Create account
                </Link>
              </p>
              {loginError && (
                <i className="text-red-500 text-center text-xs">{loginError}</i>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Page;
