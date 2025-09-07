"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { useState } from "react";

const sentCode = () => {
  toast("Code sent", {
    duration: 1500,
    style: {
      width: "95px",
      height: "30px",
      justifySelf: "center",
      borderRadius: "20px",
      border: "none",
    },
  });
};

const InputOTPPattern = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp === "") {
      setErrorMsg("Please enter OTP.");
    } else if (otp.length < 6) {
      setErrorMsg("Please enter 6 digit OTP.");
    } else if (otp !== "123456") {
      setErrorMsg("Invalid OTP.");
    } else {
      setErrorMsg("");
      router.push("/forgot-password/via-mail/auth/reset-password");
    }
  };

  return (
    <>
      <div className="sticky top-4 right-8 m-6 flex justify-end z-50">
        <ModeToggle />
      </div>
      <div className="w-screen h-screen flex my-[-100] justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="justify-center flex font-bold">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center px-6 pt-2">
              Enter the six digit code sent to your registered email address
            </CardDescription>
          </CardHeader>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={onSubmit}
          >
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <CardFooter className="flex-col gap-4">
              <div className="w-full items-center justify-between flex mt-5 mr-13">
                <Link
                  href="/forgot-password/via-mail"
                  title="Go Back"
                  className="mx-10 text-xl text-muted-foreground hover:text-gray-400"
                >
                  &lt;&lt;
                </Link>
                <div className="flex-1">
                  <Button type="submit" className="w-30 cursor-pointer">
                    Next &gt;
                  </Button>
                </div>
              </div>
              <p className="text-xs">
                Didn&apos;t get a code?{" "}
                <Link
                  href=""
                  className="text-muted-foreground hover:underline"
                  onClick={sentCode}
                >
                  Resend
                </Link>
              </p>
              {errorMsg && (
                <i className="text-red-500 text-xs my-[-5]">{errorMsg}</i>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};
export default InputOTPPattern;
