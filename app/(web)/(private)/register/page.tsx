"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function RegisterPage() {
  return (
    <div className="p-6">
      <Sheet defaultOpen>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Register Employee</SheetTitle>
          </SheetHeader>

          <form className="space-y-4 mt-6">
            <input
              className="w-full border p-2 rounded"
              placeholder="Employee Name"
            />
            <input className="w-full border p-2 rounded" placeholder="Email" />
            <input className="w-full border p-2 rounded" placeholder="Role" />

            <Button className="w-full">Submit</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
