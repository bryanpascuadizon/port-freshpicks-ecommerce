import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FRESHPICKS",
  description: "Modern E-commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
