"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-gray-50 relative h-16">
      <div className="flex items-center h-full w-full">
        <div className="flex-shrink-0">
          <Link href="/" className="font-bold text-lg whitespace-nowrap pl-4">
            Logo
          </Link>
        </div>

        <div className="ml-auto hidden md:flex items-center gap-4 pr-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/login">Login</Link>
        </div>

        <div className="ml-auto md:hidden pr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigation links</SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                <Link href="/about" className="px-4 py-2 text-sm font-medium">
                  About
                </Link>
                <Link href="/contact" className="px-4 py-2 text-sm font-medium">
                  Contact Us
                </Link>
                <Link href="/login" className="px-4 py-2 text-sm font-medium">
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96">
        <Input placeholder="Search..." />
      </div>
    </nav>
  );
};

export default Navbar;
