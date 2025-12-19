"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import LocationFilterCard, {
  LocationFilters,
} from "@/components/dashbord/location-filter-card";
import VoterDataTable from "@/components/dashbord/output-data-table";
import { Voter } from "@/type/voter.type";
import { useQuery } from "@tanstack/react-query";
import {
  fetchVoterById,
  fetchVoterByFullName,
  fetchVotersByLocation,
} from "@/axios/endpoint";

export default function Page() {
  const [queryInput, setQueryInput] = useState("");
  const [searchMode, setSearchMode] = useState<"all" | "single" | "fullName">(
    "all"
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<10 | 50 | 100 | "all">(10);
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    pollingCenter: "",
  });
  const [isLocationFilterActive, setIsLocationFilterActive] = useState(false);
  const [currentFullNameQuery, setCurrentFullNameQuery] = useState("");

  const singleVoterQuery = useQuery({
    queryKey: ["voter", queryInput],
    queryFn: () => fetchVoterById(queryInput),
    enabled: searchMode === "single",
    retry: 1,
  });

  const fullNameQuery = useQuery({
    queryKey: ["voter-fullname", currentFullNameQuery, page, limit],
    queryFn: () =>
      fetchVoterByFullName(
        currentFullNameQuery,
        page,
        limit === "all" ? 1000 : limit
      ),
    enabled: searchMode === "fullName" && !!currentFullNameQuery,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const locationVotersQuery = useQuery({
    queryKey: ["voters-by-location", locationFilters, page, limit],
    queryFn: () =>
      fetchVotersByLocation(
        locationFilters,
        page,
        limit === "all" ? 1000 : limit
      ),
    enabled: isLocationFilterActive,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const handleSearch = () => {
    const query = queryInput.trim();
    if (!query) return;

    if (/^\d+$/.test(query)) {
      setSearchMode("single");
      singleVoterQuery.refetch();
    } else {
      setSearchMode("fullName");
      setCurrentFullNameQuery(query);
      setPage(1); // Reset to first page for new search
    }

    setIsLocationFilterActive(false);
  };

  const handleReset = () => {
    setQueryInput("");
    setCurrentFullNameQuery("");
    setSearchMode("all");
    setPage(1);
    setIsLocationFilterActive(false);
    setLocationFilters({
      province: "",
      district: "",
      municipality: "",
      wardNumber: "",
      pollingCenter: "",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLocationFilterChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
    const hasAllFilters =
      !!filters.province &&
      !!filters.district &&
      !!filters.municipality &&
      !!filters.wardNumber &&
      !!filters.pollingCenter;

    setIsLocationFilterActive(hasAllFilters);
    if (!hasAllFilters && isLocationFilterActive) setSearchMode("all");
  };

  const handleApplyLocationFilters = (filters: LocationFilters) => {
    setLocationFilters(filters);
    setSearchMode("all");
    setPage(1);
    setQueryInput("");
    setCurrentFullNameQuery("");
    setIsLocationFilterActive(true);
  };

  // Prepare voter data for table
  let voters: Voter[] = [];
  let isLoading = false;
  let isError = false;
  let totalVoters = 0;
  let pagination = undefined;

  if (searchMode === "single") {
    voters = singleVoterQuery.data?.data || [];
    isLoading = singleVoterQuery.isLoading;
    isError = singleVoterQuery.isError;
    totalVoters = voters.length;
  } else if (searchMode === "fullName") {
    voters = fullNameQuery.data?.data || [];
    isLoading = fullNameQuery.isLoading;
    isError = fullNameQuery.isError;
    totalVoters = fullNameQuery.data?.pagination?.total || voters.length;
    pagination = fullNameQuery.data?.pagination;
  } else if (isLocationFilterActive) {
    voters = locationVotersQuery.data?.data || [];
    isLoading = locationVotersQuery.isLoading;
    isError = locationVotersQuery.isError;
    totalVoters = locationVotersQuery.data?.pagination?.total || voters.length;
    pagination = locationVotersQuery.data?.pagination;
  }

  const safeVoters = Array.isArray(voters) ? voters : [];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div>
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center flex-wrap gap-4 ">
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 pr-10 py-4 w-full sm:w-64 text-base"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLocationFilterActive}
                  />
                  {queryInput && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setQueryInput("")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="py-4 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    onClick={handleSearch}
                    disabled={isLocationFilterActive || isLoading}
                  >
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                  {(searchMode !== "all" || isLocationFilterActive) && (
                    <Button
                      variant="outline"
                      className="border border-red-600"
                      onClick={handleReset}
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <VoterDataTable
                    voters={safeVoters}
                    isLoading={isLoading}
                    isError={isError}
                    searchMode={searchMode}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                    pagination={pagination}
                    totalVoters={totalVoters}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <LocationFilterCard
            onFilterChange={handleLocationFilterChange}
            onApplyFilters={handleApplyLocationFilters}
            isLoading={isLocationFilterActive && locationVotersQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
