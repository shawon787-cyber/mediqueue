"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";
import { isAuthenticated } from "@/lib/api";

export default function BookingDetailsButton({ tutorId }) {
  const router = useRouter();
  const { isDark } = useTheme();

  const handleBookSession = () => {
    if (isAuthenticated()) {
      router.push(`/tutors/${tutorId}`);
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <button
      onClick={handleBookSession}
      className={`px-4 py-2 rounded-md cursor-pointer transition font-medium text-white ${
        isDark
          ? "bg-[#67aefb] hover:bg-[#4a9ce0] shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
          : "bg-[#0675C1] hover:bg-[#0564A5] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      }`}
    >
      Book Session
    </button>
  );
}
