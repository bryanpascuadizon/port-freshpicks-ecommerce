import { auth } from "@/auth";
import MicrogreensDetails from "@/components/shared/products/microgreens/MicrogreensDetails";
import { getMetadataProductBySlug } from "@/lib/handlers/productHandlers";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await props.params;

  const response = await getMetadataProductBySlug(slug);

  if (response) {
    return {
      title: `${APP_NAME} | ${response.name}`,
    };
  }

  return {
    title: APP_NAME,
  };
};

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
