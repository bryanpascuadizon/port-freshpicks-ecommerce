"use client";

import { SignOut } from "@/lib/actions/UserActions";
import { APP_NAME } from "@/lib/constants";
import { AlignJustify, House, ListOrdered, Power, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import ShoppingCartHeader from "./ShoppingCart";
import siteImage from "@/assets/site-icon.png";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const [popoverOpen, setPopOverOpen] = useState(false);

  const handleLogOut = () => {
    setPopOverOpen(false);
    SignOut();
  };
  return (
    <header className="w-full border-b-1 border-b-slate-200">
      <div className="wrapper flex-between">
        <nav className="flex-start">
          <Link href="/" className="flex-start">
            <Image src={siteImage} alt="site-icon" width="50" height="50" />
            <span className="font-bold text-3xl ml-3 text-green self-center">
              {APP_NAME}
            </span>
          </Link>
        </nav>
        <nav className="">
          <div className="flex justify-end gap-10">
            <ShoppingCartHeader />
            <Popover open={popoverOpen} onOpenChange={setPopOverOpen}>
              <PopoverTrigger>
                <AlignJustify className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="z-50">
                <div className="flex flex-col rounded-sm bg-white border-1 border-slate-200 mt-3">
                  <div className="p-3 flex flex-col">
                    <Link
                      href="/user/account/profile"
                      className="mb-3 flex text-sm"
                      onClick={() => setPopOverOpen(false)}
                    >
                      <User className="mr-4" width={20} height={20} />
                      Profile
                    </Link>
                    <Link
                      href="/user/account/addresses"
                      className="mb-3 flex text-sm"
                      onClick={() => setPopOverOpen(false)}
                    >
                      <House className="mr-4" width={20} height={20} />
                      My Addresses
                    </Link>
                    <Link
                      href="/user/orders"
                      className="flex text-sm"
                      onClick={() => setPopOverOpen(false)}
                    >
                      <ListOrdered className="mr-4" width={20} height={20} />
                      My Orders
                    </Link>
                  </div>
                  <Separator className="bg-slate-200" />
                  <p
                    onClick={handleLogOut}
                    className="p-3 flex cursor-pointer text-sm"
                  >
                    {" "}
                    <Power className="mr-4" width={20} height={20} />
                    Logout
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
