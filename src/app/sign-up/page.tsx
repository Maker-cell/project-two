"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignUpFormData, signupSchema, UserResponse } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { usePost } from "@/lib/requests";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });
  const { postData } = usePost<UserResponse, SignUpFormData>("");

  const onSubmitForm = async (data: SignUpFormData) => {
    try {
      const response = await postData(data);
      console.log(response);
      router.push("/sign-up/created-successful");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="sticky top-4 right-8 m-6 flex justify-end z-50">
        <ModeToggle />
      </div>
      <div className="w-screen h-screen my-10 flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex justify-center mb-[-5] font-bold">
              Create a New Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name:</Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    placeholder=""
                    required
                  />
                  {errors.firstName && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      *{errors.firstName.message}*
                    </i>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name {"(Surname)"}:</Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    placeholder=""
                    required
                  />
                  {errors.lastName && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      *{errors.lastName.message}*
                    </i>
                  )}
                </div>
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
                      *{errors.email.message}*
                    </i>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number:</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder=""
                    required
                  />
                  {errors.phone && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      *{errors.phone.message}*
                    </i>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password:</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    required
                  />
                  {errors.password && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      *{errors.password.message}*
                    </i>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password:</Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    required
                  />
                  {errors.confirmPassword && (
                    <i className="text-red-500 text-xs flex justify-center my-[-5]">
                      *{errors.confirmPassword.message}*
                    </i>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-[9px] my-3 text-gray-600">
                  By clicking &#39;Sign up&#39;, you agree to our{" "}
                  <a className="text-blue-800 hover:underline cursor-pointer">
                    Terms
                  </a>
                  ,
                  <a className="text-blue-800 hover:underline cursor-pointer">
                    {" "}
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-800 hover:underline cursor-pointer">
                    Cookies Policy
                  </a>
                  .
                  <br />
                  You may receive SMS or email notifications from us and can opt
                  out at any time.
                </p>
              </div>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Sign up
                </Button>
                <p className="text-xs">
                  Already have an account?{" "}
                  <Link
                    href="/"
                    className="text-muted-foreground hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default SignUp;
