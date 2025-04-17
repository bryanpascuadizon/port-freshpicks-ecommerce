import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <span className="font-bold text-3xl ml-3 text-green-700">
              {APP_NAME}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
