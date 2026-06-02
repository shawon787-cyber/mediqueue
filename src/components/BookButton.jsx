"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BookButton({ tutor, slots, setSlots }) {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    // auth check
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    // phone validation
    if (!phone) {
      toast.error("Phone number required");
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
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Booked successfully");

        // optimistic UI update
        setSlots((prev) => Math.max(prev - 1, 0));

        setShowModal(false);
        setPhone("");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOOK BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className={`w-full mt-6 py-3 rounded-xl font-bold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0675C1] hover:bg-[#0564a4] text-white"
        }`}
      >
        {slots <= 0 ? "No Slots Available" : "Book Now"}
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-5 text-center">
              Book Session
            </h2>

            <form onSubmit={handleBooking}>
              {/* Student Name */}
              <div className="mb-3">
                <label className="label">
                  <span className="label-text">Student Name</span>
                </label>

                <input
                  type="text"
                  value={session?.user?.name || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Student Email */}
              <div className="mb-3">
                <label className="label">
                  <span className="label-text">Student Email</span>
                </label>

                <input
                  type="email"
                  value={session?.user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Tutor Name */}
              <div className="mb-3">
                <label className="label">
                  <span className="label-text">Tutor Name</span>
                </label>

                <input
                  type="text"
                  value={tutor.tutorName}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Tutor ID */}
              <div className="mb-3">
                <label className="label">
                  <span className="label-text">Tutor ID</span>
                </label>

                <input
                  type="text"
                  value={tutor._id}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* ACTION BUTTONS */}
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
                  className="btn btn-outline flex-1"
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