import { VoterResponse } from "@/type/voter.type";
import axios from "axios";
import { LocationFilters } from "@/components/dashbord/location-filter-card";

import { EmployResponse } from "@/type/user.type";
import { baseUrl } from "@/utils/baseUrl";
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
