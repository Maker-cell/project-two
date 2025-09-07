"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/theme-toggle";

const ResetSuccessful = () => {
  const router = useRouter();

  return (
    <>
      <div className="sticky top-4 right-8 m-6 flex justify-end z-50">
        <ModeToggle />
      </div>
      <div className="w-screen h-screen my-[-100] flex justify-center items-center">
        <Card className="w-[50vw] max-w-sm">
          <CardHeader>
            <CardDescription className="flex justify-center font-bold text-center px-6 pt-2 text-lg">
              Password changed <br /> successfully!
            </CardDescription>
            <div className="emoji-burst text-4xl text-center mb-4">👌</div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button
                type="button"
                className="w-20px flex cursor-pointer mt-6"
                onClick={() => {
                  router.push("/");
                }}
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ResetSuccessful;
