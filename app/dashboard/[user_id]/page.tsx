"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import LocationFilterCard from "@/components/dashbord/location-filter-card";
import OutputDataTable from "@/components/dashbord/output-data-table";

export default function page() {
  const [voterId, setVoterId] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full ">
            <CardHeader className=" flex justify-between items-center flex-wrap ">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Voter Management Dashboard
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Search, filter, and manage voter information efficiently
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Input
                    placeholder="Enter Voter ID to search..."
                    className="pl-10 py-4 max-w-l text-base"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                  />
                </div>
                <Button className="py-4 px-8 bg-blue-600 rounded-full ">
                  <Search className="mr-2 h-4 w-4" /> search
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Voter Records
                  </h3>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <OutputDataTable />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <LocationFilterCard />
        </div>
      </div>
    </div>
  );
}
