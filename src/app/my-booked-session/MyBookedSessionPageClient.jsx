"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { getUser } from "@/lib/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { fetchBookings, updateBookingStatus } from "@/lib/api";

export default function MyBookedSession() {
  const user = getUser();
  const [bookings, setBookings] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!user?.email) return;
    fetchBookings(user.email).then((data) => {
      if (data.success) {
        setBookings(data.data || []);
      }
    });
  }, [user]);

  const handleConfirm = async (id) => {
    const data = await updateBookingStatus(id, "Confirmed");
    if (data.success) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Confirmed" }
            : booking
        )
      );
    }
  };

  const handleCancel = async (id) => {
    const data = await updateBookingStatus(id, "Cancelled");
    if (data.success) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
    }
  };

  return (
    <PrivateRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-5xl font-bold mb-8 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          My Booked Sessions
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`overflow-x-auto rounded-3xl shadow ${
            isDark ? "bg-[#111827]" : "bg-white"
          }`}
        >
          <table
            className={`table ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            <thead>
              <tr>
                <th>Tutor</th>
                <th>Student</th>
                <th>Email</th>
                <th>Status</th>
                <th>Confirm</th>
                <th>Cancel</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.tutorName}</td>
                  <td>{booking.studentName}</td>
                  <td>{booking.studentEmail}</td>
                  <td>
                    {booking.status === "Pending" && (
                      <span className="badge badge-info">
                        Pending
                      </span>
                    )}

                    {booking.status === "Confirmed" && (
                      <span className="badge badge-success">
                        Confirmed
                      </span>
                    )}

                    {booking.status === "Cancelled" && (
                      <span className="badge badge-error">
                        Cancelled
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      disabled={
                        booking.status === "Confirmed" ||
                        booking.status === "Cancelled"
                      }
                      onClick={() =>
                        handleConfirm(booking._id)
                      }
                      className="btn btn-sm btn-success"
                    >
                      {booking.status === "Confirmed"
                        ? "Confirmed"
                        : "Confirm"}
                    </button>
                  </td>

                  <td>
                    <button
                      disabled={
                        booking.status === "Cancelled" ||
                        booking.status === "Confirmed"
                      }
                      onClick={() =>
                        handleCancel(booking._id)
                      }
                      className="btn btn-sm btn-error"
                    >
                      {booking.status === "Cancelled"
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </PrivateRoute>
  );
}
