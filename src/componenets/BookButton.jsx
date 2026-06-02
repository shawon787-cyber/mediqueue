"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function BookButton({ tutor }) {
  const { data: session } = authClient.useSession();

  const handleBooking = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      studentName: session.user.name,
      studentEmail: session.user.email,
      status: "Pending",
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Session booked successfully");
      }
    } catch (error) {
      toast.error("Booking failed");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleBooking}
      className="w-full mt-6 bg-[#0675C1] text-white py-3 rounded-xl font-bold hover:bg-[#0564a4] transition-all shadow-lg shadow-blue-100"
    >
      Book Now
    </button>
  );
}