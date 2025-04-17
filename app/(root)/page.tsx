import React from "react";
import MicrogreensList from "@/components/shared/products/microgreens/MicrogreensList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
