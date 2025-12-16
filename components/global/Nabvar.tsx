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
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-gray-50 sticky top-0 z-50 h-16 flex items-center px-2 md:px-4">
      <div className="flex items-center h-full pl-2 md:pl-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" height={50} width={50} alt="logo" />
        </Link>
      </div>
      <div className="ml-auto hidden md:flex items-center gap-4">
        <Link href="/about" className="text-sm font-medium">
          About
        </Link>
        <Link href="/contact" className="text-sm font-medium">
          Contact Us
        </Link>
        <Link href="/login" className="text-sm font-medium">
          Login
        </Link>
      </div>

      <div className="ml-auto md:hidden">
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

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96">
        <Input placeholder="Search..." />
      </div>
    </nav>
  );
};

export default Navbar;
