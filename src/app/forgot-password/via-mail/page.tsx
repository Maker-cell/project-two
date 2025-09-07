/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordMailFormData,
  forgotPasswordMailSchema,
  generateOtpCode,
} from "@/lib/validator";
import { ModeToggle } from "@/components/ui/theme-toggle";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordMailFormData>({
    resolver: zodResolver(forgotPasswordMailSchema),
  });
  const onSubmitForm = async (data: ForgotPasswordMailFormData) => {
    const otp = generateOtpCode();

    try {
      const response = await fetch("/src/lib/send-otp.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          otp,
        }),
      });

      if (response.ok) {
        toast("Code sent to user email", {
          description: "Click 'Okay' to enter code",
          action: {
            label: "Okay",
            onClick: () => router.push("/forgot-password/via-mail/auth"),
          },
        });
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
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
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center px-6 pt-2">
              Enter registered email address to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder=""
                    required
                  />
                  {errors.email && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      {errors.email.message}
                    </i>
                  )}
                </div>
              </div>
              <div className="flex justify-center mb-[-5] mt-5">
                <Button type="submit" className="w-30 cursor-pointer flex">
                  Send
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <p className="text-xs">
              Didn&apos;t receive a code?{" "}
              <Link
                href="/forgot-password/via-phone"
                className="text-muted-foreground hover:underline"
              >
                Receive via text instead
              </Link>
            </p>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:underline"
            >
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default ForgotPassword;
