import React from "react";
import MicrogreensList from "@/components/shared/products/microgreens/MicrogreensList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | Home`
};

const Home = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <>
      <MicrogreensList />
    </>
  );
};

export default Home;
