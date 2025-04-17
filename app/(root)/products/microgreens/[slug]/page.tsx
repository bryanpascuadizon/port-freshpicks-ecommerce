import { auth } from "@/auth";
import MicrogreensDetails from "@/components/shared/products/microgreens/MicrogreensDetails";
import { redirect } from "next/navigation";
import React from "react";

const MicrogreensDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <section className="my-10">
      <MicrogreensDetails slug={slug} />
    </section>
  );
};

export default MicrogreensDetailsPage;
