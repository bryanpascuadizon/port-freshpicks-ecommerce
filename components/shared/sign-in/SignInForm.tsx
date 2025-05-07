"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { googleSignIn, SignIn } from "@/lib/actions/UserActions";
import { useSearchParams } from "next/navigation";
import { useActionState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader } from "lucide-react";

const SignInForm = () => {
  const [data, action] = useActionState(SignIn, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isGooglePending, startGoogleTransition] = useTransition();

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        variant="default"
        className="green-button w-full bg-green-700 cursor-pointer"
      >
        {pending ? <Loader className="animate-spin w-full" /> : "Sign In"}
      </Button>
    );
  };

  const handleGoogleSign = () => {
    const signInGoogle = async () => {
      await googleSignIn();

      return;
    };
    startGoogleTransition(() => {
      signInGoogle();
    });
  };

  return (
    <>
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
      </form>
      <p className="my-2 text-black text-center">or</p>
      <Button
        disabled={isGooglePending}
        className="cursor-pointer w-full bg-white hover:bg-white text-black border-1 border-slate-1 flex mb-2"
        onClick={handleGoogleSign}
      >
        {isGooglePending ? (
          <Loader className="w-full animate-spin" />
        ) : (
          <>
            <Image
              src="/images/google_icon.jpg"
              alt="google"
              width={35}
              height={35}
            />
            <p>Sign in with Goolge</p>
          </>
        )}
      </Button>{" "}
    </>
  );
};

export default SignInForm;
