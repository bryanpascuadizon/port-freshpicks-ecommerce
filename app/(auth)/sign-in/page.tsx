import { auth } from "@/auth";
import SignInForm from "@/components/shared/sign-in/SignInForm";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import siteImage from "@/assets/site-icon.png";

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto mt-[-100px]">
      <div className="p-5">
        <Image src={siteImage} alt="site-image" width="100" height="100" className="m-auto mb-5"/>
        <div className="text-center font-bold text-3xl ml-3 text-green-700 mb-5">
          {APP_NAME}
        </div>
        <p className="text-center mb-5">Login</p>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
