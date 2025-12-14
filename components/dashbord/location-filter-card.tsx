"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  districts,
  municipalities,
  pollingCenters,
  provinces,
  wards,
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
  onApplyFilters,
  isLoading = false,
}: LocationFilterCardProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedPolling, setSelectedPolling] = useState<string>("");

  // Helper function to get current filters
  const getCurrentFilters = (): LocationFilters => ({
    province: selectedProvince,
    district: selectedDistrict,
    municipality: selectedMunicipality,
    wardNumber: selectedWard,
    pollingCenter: selectedPolling,
  });

  // Handle province change
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");

    // Call onFilterChange with updated filters
    if (onFilterChange) {
      onFilterChange({
        province: value,
        district: "",
        municipality: "",
        wardNumber: "",
        pollingCenter: "",
      });
    }
  };

  // Handle district change
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");

    if (onFilterChange) {
      onFilterChange({
        province: selectedProvince,
        district: value,
        municipality: "",
        wardNumber: "",
        pollingCenter: "",
      });
    }
  };

  // Handle municipality change
  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value);
    setSelectedWard("");
    setSelectedPolling("");

    if (onFilterChange) {
      onFilterChange({
        province: selectedProvince,
        district: selectedDistrict,
        municipality: value,
        wardNumber: "",
        pollingCenter: "",
      });
    }
  };

  // Handle ward change
  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    setSelectedPolling("");

    if (onFilterChange) {
      onFilterChange({
        province: selectedProvince,
        district: selectedDistrict,
        municipality: selectedMunicipality,
        wardNumber: value,
        pollingCenter: "",
      });
    }
  };

  // Handle polling center change
  const handlePollingChange = (value: string) => {
    setSelectedPolling(value);

    if (onFilterChange) {
      onFilterChange({
        province: selectedProvince,
        district: selectedDistrict,
        municipality: selectedMunicipality,
        wardNumber: selectedWard,
        pollingCenter: value,
      });
    }
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(getCurrentFilters());
    }
  };

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");

    if (onFilterChange) {
      onFilterChange({
        province: "",
        district: "",
        municipality: "",
        wardNumber: "",
        pollingCenter: "",
      });
    }
  };

  const hasActiveFilters =
    selectedProvince ||
    selectedDistrict ||
    selectedMunicipality ||
    selectedWard ||
    selectedPolling;

  const isApplyDisabled = !hasActiveFilters || isLoading;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-gray-800">
              Location Filters
            </CardTitle>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-red-600 border border-red-400"
              disabled={isLoading}
            >
              <X className="h-4 w-4 text-red-600 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <CardDescription className="text-gray-500 text-sm">
          Narrow down voters by location hierarchy
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Province</label>
          <Select
            value={selectedProvince}
            onValueChange={handleProvinceChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">District</label>
          <Select
            value={selectedDistrict}
            onValueChange={handleDistrictChange}
            disabled={!selectedProvince || isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {(selectedProvince ? districts[selectedProvince] || [] : []).map(
                (d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Municipality
          </label>
          <Select
            value={selectedMunicipality}
            onValueChange={handleMunicipalityChange}
            disabled={!selectedDistrict || isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Municipality" />
            </SelectTrigger>
            <SelectContent>
              {(selectedDistrict
                ? municipalities[selectedDistrict] || []
                : []
              ).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Ward Number
          </label>
          <Select
            value={selectedWard}
            onValueChange={handleWardChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Ward" />
            </SelectTrigger>
            <SelectContent>
              {wards.map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Polling Center
          </label>
          <Select
            value={selectedPolling}
            onValueChange={handlePollingChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Polling Center" />
            </SelectTrigger>
            <SelectContent>
              {pollingCenters.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProvince && (
                <Badge variant="secondary" className="px-3 py-1">
                  Province: {selectedProvince}
                </Badge>
              )}
              {selectedDistrict && (
                <Badge variant="secondary" className="px-3 py-1">
                  District: {selectedDistrict}
                </Badge>
              )}
              {selectedMunicipality && (
                <Badge variant="secondary" className="px-3 py-1">
                  Municipality: {selectedMunicipality}
                </Badge>
              )}
              {selectedWard && (
                <Badge variant="secondary" className="px-3 py-1">
                  Ward: {selectedWard}
                </Badge>
              )}
              {selectedPolling && (
                <Badge variant="secondary" className="px-3 py-1">
                  Polling: {selectedPolling}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 py-3"
          onClick={handleApplyFilters}
          disabled={isApplyDisabled}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Applying...
            </div>
          ) : (
            "Apply Filters"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LocationFilterCard;
