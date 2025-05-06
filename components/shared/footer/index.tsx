import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import siteImage from "@/assets/site-icon.png";

const Footer = () => {
  return (
    <footer className="w-full border-t-1 border-t-slate-200">
      <div className="wrapper flex-between">
        <nav className="flex-start">
          <Link href="/" className="flex">
            <Image src={siteImage} alt="site-icon" width="50" height="50" />
            <span className="font-bold text-3xl ml-3 text-green self-center">
              {APP_NAME}
            </span>
          </Link>
        </nav>
        <nav className="flex justify-end">
          <span className="self-center mr-auto">
            © 2025{" "}
            <Link
              href="https://github.com/bryanpascuadizon"
              className="text-green"
            >
              Bryan Dizon
            </Link>{" "}
            | All Rights Reserved
          </span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
