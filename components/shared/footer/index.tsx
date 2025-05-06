import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import siteImage from "@/assets/site-icon.png";

const Footer = () => {
  return (
    <footer className="w-full border-t-1 border-t-slate-200">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex">
            <Image src={siteImage} alt="site-icon" width="50" height="50" />
            <span className="font-bold text-3xl ml-3 text-green self-center">
              {APP_NAME}
            </span>
            <span className="self-center mr-auto">
              © 2025 Bryan Dizon | All Rights Reserved
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
