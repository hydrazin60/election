"use client";

import React, { useState, useEffect } from "react";
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
import LocationFilterCard from "@/components/dashbord/location-filter-card";
import VoterDataTable from "@/components/dashbord/output-data-table";
import { Voter, VoterResponse } from "@/type/voter.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchVoterById = async (voterId: string): Promise<VoterResponse> => {
  try {
    const { data } = await axios.get(`/api/election/${voterId}`);
    console.log("API Response for voter ID:", voterId, data);

    if (data.success) {
      if (Array.isArray(data.data)) {
        return data;
      } else if (data.data && typeof data.data === "object") {
        return {
          ...data,
          data: [data.data],
        };
      }
    }

    if (data && typeof data === "object" && "voter_id" in data) {
      return {
        success: true,
        data: [data],
        pagination: {
          page: 1,
          limit: 1,
          total: 1,
          hasMore: false,
          totalPages: 1,
        },
      };
    }

    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 0,
        total: 0,
        hasMore: false,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error("Error fetching voter:", error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 0,
        total: 0,
        hasMore: false,
        totalPages: 0,
      },
    };
  }
};

const fetchAllVoters = async (
  page: number,
  limit: number
): Promise<VoterResponse> => {
  try {
    const { data } = await axios.get("/api/election", {
      params: { page, limit },
    });
    return data;
  } catch (error) {
    console.error("Error fetching all voters:", error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 0,
        total: 0,
        hasMore: false,
        totalPages: 0,
      },
    };
  }
};

export default function Page() {
  const [voterId, setVoterId] = useState("");
  const [searchMode, setSearchMode] = useState<"all" | "single">("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<10 | 50 | 100 | "all">(10);

  const singleVoterQuery = useQuery({
    queryKey: ["voter", voterId],
    queryFn: () => fetchVoterById(voterId),
    enabled: searchMode === "single" && voterId.length > 0,
    retry: 1,
  });

  const allVotersQuery = useQuery({
    queryKey: ["voters", page, limit],
    queryFn: () => fetchAllVoters(page, limit === "all" ? 1000 : limit),
    enabled: searchMode === "all",
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const handleSearch = () => {
    if (voterId.trim()) {
      setSearchMode("single");
      setPage(1);
    } else {
      setSearchMode("all");
    }
  };

  const handleReset = () => {
    setVoterId("");
    setSearchMode("all");
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  let voters: Voter[] = [];
  let isLoading = false;
  let isError = false;
  let totalVoters = 0;

  if (searchMode === "single") {
    voters = singleVoterQuery.data?.data || [];
    isLoading = singleVoterQuery.isLoading;
    isError = singleVoterQuery.isError;
    totalVoters = voters.length;
  } else {
    voters = allVotersQuery.data?.data || [];
    isLoading = allVotersQuery.isLoading;
    isError = allVotersQuery.isError;
    totalVoters = allVotersQuery.data?.pagination?.total || voters.length;
  }

  const safeVoters = Array.isArray(voters) ? voters : [];
  useEffect(() => {
    if (searchMode === "all") {
    }
  }, [searchMode]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center flex-wrap gap-4">
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
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter Voter ID to search..."
                      className="pl-10 pr-10 py-4 w-full sm:w-64 text-base"
                      value={voterId}
                      onChange={(e) => setVoterId(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    {voterId && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setVoterId("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="py-4 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    onClick={handleSearch}
                    disabled={singleVoterQuery.isLoading}
                  >
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                  {searchMode === "single" && (
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
                <div className="flex items-center justify-between">
                  {searchMode === "all" && (
                    <span className="text-sm text-gray-500">
                      {totalVoters.toLocaleString()} total voters
                    </span>
                  )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <VoterDataTable
                    voters={safeVoters}
                    isLoading={isLoading}
                    isError={isError}
                    searchMode={searchMode}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                    pagination={allVotersQuery.data?.pagination}
                    totalVoters={totalVoters}
                  />
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
