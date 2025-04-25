import { SignOut } from "@/lib/actions/UserActions";
import { APP_NAME } from "@/lib/constants";
import { AlignJustify, ListOrdered, Power, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ShoppingCartHeader from "./ShoppingCart";
import siteImage from "@/assets/site-icon.png";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="w-full border-b-1 border-b-slate-100">
      <div className="wrapper flex-between">
        <nav className="flex-start">
          <Link href="/" className="flex-start">
            <Image src={siteImage} alt="site-icon" width="50" height="50" />
            <span className="font-bold text-3xl ml-3 text-green-700 self-center">
              {APP_NAME}
            </span>
          </Link>
        </nav>
        <nav className="">
          <div className="flex justify-end gap-10">
            <ShoppingCartHeader />
            <Popover>
              <PopoverTrigger>
                <AlignJustify className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="">
                <div className="flex flex-col rounded-sm bg-white border-1 border-slate-200 mt-3">
                  <div className="p-3 flex flex-col">
                    <Link href="/user/account/profile" className="mb-1 flex">
                      <User className="mr-4" />
                      Profile
                    </Link>

                    <Link href="/user/orders" className="mb-1 flex">
                      <ListOrdered className="mr-4" />
                      My Orders
                    </Link>
                  </div>
                  <Separator />
                  <p className="cursor-pointer p-2 flex" onClick={SignOut}>
                    <Power className="mr-4" />
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
