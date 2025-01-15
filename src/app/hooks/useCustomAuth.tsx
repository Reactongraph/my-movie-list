"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCustomAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
};

export default useCustomAuth;
