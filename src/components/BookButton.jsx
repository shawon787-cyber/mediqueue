"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BookButton({ tutor, slots, setSlots }) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (slots <= 0) {
      toast.error("No slots available");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId: tutor._id,
          tutorName: tutor.tutorName,
          studentName: session.user.name,
          studentEmail: session.user.email,
          status: "Pending",
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Booked successfully");

        // 🔥 THIS IS THE MAGIC
        setSlots((prev) => prev - 1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={slots <= 0 || loading}
      className={`w-full mt-6 py-3 rounded-xl font-bold ${
        slots <= 0
          ? "bg-gray-400"
          : "bg-[#0675C1] text-white hover:bg-[#0564a4]"
      }`}
    >
      {slots <= 0
        ? "No Slots"
        : loading
        ? "Booking..."
        : "Book Now"}
    </button>
  );
}