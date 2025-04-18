import { SignOut } from "@/lib/actions/UserActions";
import { APP_NAME } from "@/lib/constants";
import { LogOut, ShoppingCart } from "lucide-react";

import Link from "next/link";
import React from "react";

const Header = async () => {
  return (
    <header className="w-full">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <span className="font-bold text-3xl ml-3 text-green-700">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          <Link href="/cart" className="">
            <ShoppingCart />
          </Link>
          <LogOut className="ml-5 cursor-pointer" onClick={SignOut} />
        </div>
      </div>
    </header>
  );
};

export default Header;
