"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";

export const useAuthRedirect = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${baseUrl}/api/auth/me`, {
          withCredentials: true,
        });

        if (res.data?.user?.id) {
          router.push(`/dashboard/${res.data.user.id}`);
          return;
        }

        router.push("/login");
      } catch (error) {
        router.push("/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [router]);

  return checking;
};
