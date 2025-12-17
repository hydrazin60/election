"use client";
import React, { useState } from "react";
import Tabledata from "./Tabledata";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Voter } from "@/type/voter.type";
import { Loader2 } from "lucide-react";

interface VoterDataTableProps {
  voters: Voter[];
  isLoading: boolean;
  isError: boolean;
  searchMode: "all" | "single" | "fullName";
  page: number;
  limit: 10 | 50 | 100 | "all";
  onPageChange: (page: number) => void;
  onLimitChange: (limit: 10 | 50 | 100 | "all") => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    totalPages: number;
  };
  totalVoters?: number;
}

export default function VoterDataTable({
  voters,
  isLoading,
  searchMode,
  page,
  limit,
  onPageChange,
  onLimitChange,
  pagination,
  totalVoters = 0,
}: VoterDataTableProps) {
  const [expandedVoter, setExpandedVoter] = useState<number | null>(null);

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;

  const safeVoters = Array.isArray(voters) ? voters : [];

  if (searchMode === "single" && safeVoters.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No voter found with the specified ID.</p>
      </div>
    );
  }

  if (safeVoters.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No voter records found.</p>
      </div>
    );
  }
  const selectedVoter =
    safeVoters.find((v) => {
      if (v && typeof v === "object" && "voter_id" in v) {
        return v.voter_id === expandedVoter;
      }
      return false;
    }) || null;

  const displayLimit = limit === "all" ? 1000 : limit;
  const totalPages = pagination
    ? Math.ceil(pagination.total / displayLimit)
    : 1;

  return (
    <div className="flex flex-col gap-4 p-4">
      {searchMode === "all" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show:</span>
            <Select
              value={limit.toString()}
              onValueChange={(v) =>
                onLimitChange(
                  v === "all" ? "all" : (Number(v) as 10 | 50 | 100)
                )
              }
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              {totalVoters} total voters
            </span>
          </div>
        </div>
      )}

      <Tabledata
        voters={safeVoters}
        expandedVoter={expandedVoter}
        onExpand={setExpandedVoter}
      />

      {searchMode === "all" && pagination && (
        <div className="flex justify-between items-center">
          <Button
            disabled={page === 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {pagination?.page ?? 1} of {totalPages}
          </span>
          {isLoading ? (
            <Button disabled className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </Button>
          ) : (
            <Button
              disabled={!pagination?.hasMore}
              onClick={() => onPageChange(page + 1)}
              variant="outline"
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
