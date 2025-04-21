import { SignOut } from "@/lib/actions/UserActions";
import { APP_NAME } from "@/lib/constants";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ShoppingCartHeader from "./ShoppingCart";
import siteImage from "@/assets/site-icon.png";

const Header = () => {
  return (
    <header className="w-full border-b-1 border-b-slate-100">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image src={siteImage} alt="site-icon" width="50" height="50" />
            <span className="font-bold text-3xl ml-3 text-green-700 self-center">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          <ShoppingCartHeader />
          <LogOut className="ml-5 cursor-pointer" onClick={SignOut} />
        </div>
      </div>
    </header>
  );
};

export default Header;
