import { VoterResponse } from "@/type/voter.type";
import axios from "axios";

import { EmployResponse } from "@/type/user.type";
import { baseUrl } from "@/utils/baseUrl";
import { LocationFilters } from "@/components/dashbord/location-filter-card";
export const fetchVoterById = async (
  voterId: string
): Promise<VoterResponse> => {
  try {
    const { data } = await axios.get(`/api/election/${voterId}`);

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

export const fetchVotersByLocation = async (
  locationFilters: LocationFilters,
  page: number,
  limit: number
): Promise<VoterResponse> => {
  try {
    const { data } = await axios.post("/api/election", {
      ...locationFilters,
      page,
      limit,
    });
    return data;
  } catch (error) {
    console.error("Error fetching voters by location:", error);
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
export const fetchEmployList = async (): Promise<EmployResponse> => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/auth/userlist`);
    return data;
  } catch (error) {
    console.log("Error fetching employee list", error);
    throw new Error("Error fetching employee list");
  }
};

export const fetchVoterByFullName = async (
  fullName: string,
  page?: number,
  limit?: number
): Promise<VoterResponse> => {
  try {
    if (!fullName || fullName.trim() === "") {
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

    const encodedName = encodeURIComponent(fullName.trim());

    const params = new URLSearchParams();
    params.append("name", encodedName);

    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const { data } = await axios.get(
      `/api/election/search/${encodedName}?${params.toString()}`
    );

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

    if (data.success && data.data && !data.pagination) {
      const voters = Array.isArray(data.data) ? data.data : [data.data];
      return {
        ...data,
        data: voters,
        pagination: {
          page: page || 1,
          limit: limit || voters.length,
          total: voters.length,
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
    console.error("Error fetching voter by full name:", error);
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
