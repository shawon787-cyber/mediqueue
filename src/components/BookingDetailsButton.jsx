"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookingDetailsButton({ tutorId }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleBookSession = () => {
    if (session) {
      router.push(`/tutors/${tutorId}`);
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <button
      onClick={handleBookSession}
      className="bg-[#0675C1] hover:bg-[#0564A5] text-white px-4 py-2 rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1)] cursor-pointer transition font-medium"
    >
      Book Session
    </button>
  );
}