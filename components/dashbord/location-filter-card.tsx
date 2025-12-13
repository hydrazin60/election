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

function LocationFilterCard() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedPolling, setSelectedPolling] = useState<string>("");

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");
  };

  const hasActiveFilters =
    selectedProvince ||
    selectedDistrict ||
    selectedMunicipality ||
    selectedWard ||
    selectedPolling;

  return (
    <Card className=" h-full">
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
            onValueChange={(value) => {
              setSelectedProvince(value);
              setSelectedDistrict("");
              setSelectedMunicipality("");
              setSelectedWard("");
              setSelectedPolling("");
            }}
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
            onValueChange={setSelectedDistrict}
            disabled={!selectedProvince}
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
            onValueChange={setSelectedMunicipality}
            disabled={!selectedDistrict}
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
          <Select value={selectedWard} onValueChange={setSelectedWard}>
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
          <Select value={selectedPolling} onValueChange={setSelectedPolling}>
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
        <Button className="w-full bg-blue-600  py-3">Apply Filters</Button>
      </CardFooter>
    </Card>
  );
}

export default LocationFilterCard;
