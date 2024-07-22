"use server";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import Account from "./account";
import SidebarMobile from "./sidebarMobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="py-4 border-b">
      <div className=" px-5 flex justify-between items-center">
        <SidebarMobile />
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="VoidNote Logo" width={40} height={40} />
          <span className="ml-2 text-lg font-bold">VoidNote</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/pricing">
            <div className="hover:text-gray-300">Pricing</div>
          </Link>
          <Link href="/features">
            <div className="hover:text-gray-300">Features</div>
          </Link>
          <Link href="/dashboard">
            <div className="hover:text-gray-300">Notes</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-gray-300">About</div>
          </Link>
        </nav>
        <div className="flex md:hidden items-center">
          <ModeToggle />
          <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden ml-2">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-45 p-4 bg-white shadow-lg rounded-md">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex flex-col space-y-4">
              <Link href="/register">
                <button className="text-sm md:text-base px-4 py-2 rounded hover:bg-gray-200 w-full">
                  Create an Account
                </button>
              </Link>
              <Link href="/login">
                <button className="text-sm md:text-base px-4 py-2 rounded hover:bg-gray-200 w-full">
                  Login
                </button>
              </Link>
            </div>
          </nav>
        </PopoverContent>
      </Popover>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <ModeToggle />
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
