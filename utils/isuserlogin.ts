"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { baseUrl } from "./baseUrl";

export const useAuthRedirectQuery = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["authMe"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/api/auth/me`, {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  const userId = query.data?.user?.id ?? null;
  useEffect(() => {
    if (query.isSuccess && query.data?.user?.id) {
      router.push(`/dashboard/${query.data.user.id}`);
    }

    if (query.isError) {
      router.push("/login");
    }
  }, [query.isSuccess, query.isError, query.data, router]);

  return {
    ...query,
    userId,
  };
};
