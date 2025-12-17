"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft, Filter, Loader2, X } from "lucide-react";
import {
  districts,
  municipalities,
  pollingCenters,
  provinces,
} from "@/data/static_data/location";

interface LocationFilterCardProps {
  onFilterChange?: (filters: LocationFilters) => void;
  onApplyFilters?: (filters: LocationFilters) => void;
  isLoading?: boolean;
}

export interface LocationFilters {
  province: string;
  district: string;
  municipality: string;
  wardNumber: string;
  pollingCenter: string;
}

function LocationFilterCard({
  onFilterChange,
  isLoading = false,
}: LocationFilterCardProps) {
  const [filters, setFilters] = useState<LocationFilters>({
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    pollingCenter: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const getFilteredPollingCenters = () => {
    const centers = filters.district
      ? pollingCenters[filters.district] || []
      : [];
    if (!searchTerm) return centers;
    return centers.filter((center) =>
      center.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const updateFilter = (key: keyof LocationFilters, value: string) => {
    const newFilters = { ...filters };

    switch (key) {
      case "province":
        newFilters.district = "";
        newFilters.municipality = "";
        newFilters.wardNumber = "";
        newFilters.pollingCenter = "";
        break;
      case "district":
        newFilters.municipality = "";
        newFilters.wardNumber = "";
        newFilters.pollingCenter = "";
        break;
      case "municipality":
        newFilters.wardNumber = "";
        newFilters.pollingCenter = "";
        break;
      case "wardNumber":
        newFilters.pollingCenter = "";
        break;
    }

    newFilters[key] = value;
    setFilters(newFilters);
    setSearchTerm("");

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      province: "",
      district: "",
      municipality: "",
      wardNumber: "",
      pollingCenter: "",
    };
    setFilters(resetFilters);
    setSearchTerm("");
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  if (isCollapsed) {
    return (
      <div className="fixed right-4 bottom-10 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:bg-blue-600 bg-blue-700 text-white"
          onClick={() => setIsCollapsed(false)}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed right-0 top-1 w-80 border border-gray-200 animate-in  z-50     ">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border"
              onClick={() => setIsCollapsed(true)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg font-semibold">
              Location Filters
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-8 text-muted-foreground hover:text-destructive"
                disabled={isLoading}
              >
                <X className="h-4 w-4 text-red-700 " />
              </Button>
            )}
          </div>
        </div>
        <CardDescription>Filter voters by location hierarchy</CardDescription>
      </CardHeader>

      <Separator />

      <ScrollArea className="h-[calc(100vh-220px)]">
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select
                value={filters.province}
                onValueChange={(value) => updateFilter("province", value)}
                disabled={isLoading}
              >
                <SelectTrigger id="province" className="w-full">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select
                value={filters.district}
                onValueChange={(value) => updateFilter("district", value)}
                disabled={!filters.province || isLoading}
              >
                <SelectTrigger id="district" className="w-full">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {(filters.province
                    ? districts[filters.province] || []
                    : []
                  ).map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality</Label>
              <Select
                value={filters.municipality}
                onValueChange={(value) => updateFilter("municipality", value)}
                disabled={!filters.district || isLoading}
              >
                <SelectTrigger id="municipality" className="w-full">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {(filters.district
                    ? municipalities[filters.district] || []
                    : []
                  ).map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ward">Ward Number</Label>
              <Input
                id="ward"
                type="number"
                min="1"
                max="32"
                placeholder="Enter ward number (1-32)"
                value={filters.wardNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (Number(value) >= 1 && Number(value) <= 32)
                  ) {
                    updateFilter("wardNumber", value);
                  }
                }}
                disabled={isLoading}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-xs text-muted-foreground">
                Enter a number between 1 and 32
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="polling">Polling Center</Label>
              <div className="space-y-2">
                <Select
                  value={filters.pollingCenter}
                  onValueChange={(value) =>
                    updateFilter("pollingCenter", value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger id="polling" className="w-full">
                    <SelectValue placeholder="Select polling center" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {getFilteredPollingCenters().map((center) => (
                      <SelectItem key={center} value={center}>
                        {center}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-2">Loading employee data...</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardContent>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 border items-center "
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronsLeft className="h-6 w-6 animate-in slide-in-from-left repeat-infinite duration-1000 alternate" />
        </Button>
      </ScrollArea>
    </Card>
  );
}

export default LocationFilterCard;
