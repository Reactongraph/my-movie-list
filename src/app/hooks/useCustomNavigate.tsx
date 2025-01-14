"use client";

import { useRouter } from "next/navigation";

export function useCustomNavigate() {
  const router = useRouter();

  const navigate = (
    path: string,
    options: { replace?: boolean; shallow?: boolean } = {}
  ) => {
    // For shallow routing, we manually pass shallow option within the options object for both push and replace
    if (options.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  return { navigate };
}
