import { auth } from "@/auth";
import SignInForm from "@/components/shared/sign-in/SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-sm bg-slate-100 p-5">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
