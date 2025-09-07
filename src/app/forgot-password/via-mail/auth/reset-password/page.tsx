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
import { ModeToggle } from "@/components/ui/theme-toggle";
import { confirmPasswordFormData, confirmPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const NewPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<confirmPasswordFormData>({
    resolver: zodResolver(confirmPasswordSchema),
  });
  const onSubmitForm = (data: confirmPasswordFormData) => {
    router.push(
      "/forgot-password/via-mail/auth/reset-password/reset-successful"
    );
    reset();
  };

  return (
    <>
      <div className="sticky top-4 right-8 m-6 flex justify-end z-50">
        <ModeToggle />
      </div>
      <div className="w-screen h-screen my-[-100] flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex justify-center font-bold">
              Password Reset
            </CardTitle>
            <CardDescription className="text-center px-6 pt-2">
              Create a new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password:</Label>
                  </div>
                  <Input
                    id="password"
                    title=""
                    type="password"
                    {...register("password")}
                    required
                  />
                  {errors.password && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      {errors.password.message}
                    </i>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password:
                    </Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    title=""
                    type="password"
                    {...register("confirmPassword")}
                    required
                  />
                  {errors.confirmPassword && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      {errors.confirmPassword.message}
                    </i>
                  )}
                </div>
              </div>

              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer mt-6">
                  Change Password
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default NewPassword;
