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

  if (isLoading)
    return (
      <div className="p-6 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );

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

  const displayLimit = limit === "all" ? 1000 : limit;

  // Calculate total pages for pagination
  const totalPages = pagination
    ? Math.ceil(pagination.total / displayLimit)
    : 1;

  // Determine if we should show pagination controls
  const shouldShowPagination =
    pagination &&
    (searchMode === "all" || // Location-based search
      (searchMode === "fullName" && pagination.total > displayLimit)); // Full name search with pagination

  // Determine if we should show limit selector
  const shouldShowLimitSelector =
    searchMode === "all" ||
    (searchMode === "fullName" && pagination && pagination.total > 10);

  return (
    <div className="flex flex-col gap-4 p-4">
      {(searchMode === "all" || searchMode === "fullName") && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {shouldShowLimitSelector && (
              <>
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
              </>
            )}
            <span className="text-sm text-gray-500">
              {totalVoters.toLocaleString()} total voters
              {searchMode === "fullName" &&
                pagination &&
                ` (Page ${pagination.page} of ${totalPages})`}
            </span>
          </div>
        </div>
      )}

      <Tabledata
        voters={safeVoters}
        expandedVoter={expandedVoter}
        onExpand={setExpandedVoter}
      />
      {shouldShowPagination && (
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
