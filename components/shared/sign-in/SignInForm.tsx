"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignIn } from "@/lib/actions/UserActions";
//import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignInForm = () => {
  const [data, action] = useActionState(SignIn, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        variant="default"
        className="w-full bg-green-700 mb-5 cursor-pointer"
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <p className="mb-2">Email</p>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        className="block mb-5 w-full p-2 rounded-sm bg-white"
      />
      <p className="mb-2">Password</p>
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        className="block mb-5 w-full p-2 rounded-sm bg-white"
      />
      {data && !data.success && (
        <p className="text-center mb-5 text-destructive">{data.message}</p>
      )}
      <SignInButton />
      {/* <div className="text-center w-full">
        <Link href="/sign-in">Forgot your password?</Link>
      </div> */}
    </form>
  );
};

export default SignInForm;
