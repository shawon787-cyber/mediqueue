"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";

export default function AuthRedirect({ children, destination = "/" }) {
  const { isLoggedIn, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && isLoggedIn) {
      router.replace(destination);
    }
  }, [destination, isHydrated, isLoggedIn, router]);

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isLoggedIn) return null;

  return <>{children}</>;
}
