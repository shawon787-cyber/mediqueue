"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";
import { useAuth } from "@/lib/AuthProvider";
import { createBooking } from "@/lib/api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BookButton({ tutor, slots, setSlots }) {
  const router = useRouter();
  const { isDark } = useTheme();
  const { user, isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");

  const currentDate = new Date();
  const sessionStartDate = tutor.sessionStartDate ? new Date(tutor.sessionStartDate) : null;
  const isBookingAvailable = sessionStartDate && currentDate >= sessionStartDate;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      toast.error("Please login first");
      router.replace("/login");
      return;
    }

    if (!phone) {
      toast.error("Phone number required");
      return;
    }

    setLoading(true);

    try {
      const data = await createBooking({
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        studentName: user.name,
        studentEmail: user.email,
        phone,
      });

      if (data.success) {
        toast.success("Booked successfully");
        setSlots((prev) => Math.max(prev - 1, 0));
        setShowModal(false);
        setPhone("");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      if (
        error.message !== "Please login first" &&
        error.message !== "Unauthorized"
      ) {
        console.error(error);
        toast.error("Server error. Try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isBookingAvailable && (
        <p className="text-center text-red-500 font-medium mb-4">
          Booking is not available yet for this tutor
        </p>
      )}

      <button
        onClick={() => isBookingAvailable && setShowModal(true)}
        disabled={loading || !isBookingAvailable || slots <= 0}
        className={`w-full mt-6 py-3 rounded-xl font-bold transition ${
          loading || !isBookingAvailable || slots <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0675C1] hover:bg-[#0564a4] text-white"
        }`}
      >
        {slots <= 0 ? "No Slots Available" : "Book Now"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4">
          <div
            className={`rounded-xl shadow-xl w-full max-w-md p-6 ${
              isDark
                ? "bg-[#111827] text-gray-200"
                : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-2xl font-bold mb-5 text-center">
              Book Session
            </h2>

            <form onSubmit={handleBooking}>
              <div className="mb-3">
                <label className="label">
                  <span
                    className={`label-text ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    Student Name
                  </span>
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className={`input input-bordered w-full ${
                    isDark
                      ? "bg-[#1a2235] border-gray-700 text-white"
                      : ""
                  }`}
                />
              </div>

              <div className="mb-3">
                <label className="label">
                  <span
                    className={`label-text ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    Student Email
                  </span>
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className={`input input-bordered w-full ${
                    isDark
                      ? "bg-[#1a2235] border-gray-700 text-white"
                      : ""
                  }`}
                />
              </div>

              <div className="mb-3">
                <label className="label">
                  <span
                    className={`label-text ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    Tutor Name
                  </span>
                </label>

                <input
                  type="text"
                  value={tutor.tutorName}
                  readOnly
                  className={`input input-bordered w-full ${
                    isDark
                      ? "bg-[#1a2235] border-gray-700 text-white"
                      : ""
                  }`}
                />
              </div>

              <div className="mb-3">
                <label className="label">
                  <span
                    className={`label-text ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    Tutor ID
                  </span>
                </label>

                <input
                  type="text"
                  value={tutor._id}
                  readOnly
                  className={`input input-bordered w-full ${
                    isDark
                      ? "bg-[#1a2235] border-gray-700 text-white"
                      : ""
                  }`}
                />
              </div>

              <div className="mb-5">
                <label className="label">
                  <span
                    className={`label-text ${
                      isDark ? "text-gray-300" : ""
                    }`}
                  >
                    Phone Number
                  </span>
                </label>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`input input-bordered w-full ${
                    isDark
                      ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                      : ""
                  }`}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-[#0675C1] text-white flex-1"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setPhone("");
                  }}
                  className={`btn btn-outline flex-1 ${
                    isDark
                      ? "btn-outline text-gray-200 border-gray-600"
                      : ""
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
