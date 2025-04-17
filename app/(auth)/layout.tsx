import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${APP_NAME} - Sign-In`
}

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
}
