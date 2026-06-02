"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function MyBookedSession() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/bookings/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookings(data.data));
  }, [session]);

  const handleCancel = async (id) => {
    await fetch(
      `http://localhost:5000/bookings/${id}`,
      {
        method: "PATCH",
      }
    );

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-8">
        My Booked Sessions
      </h1>

      <div className="overflow-x-auto bg-white rounded-3xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Student</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.tutorName}</td>

                <td>{booking.studentName}</td>

                <td>{booking.studentEmail}</td>

                <td>
                  {booking.status === "Pending" ? (
                    <span className="badge badge-info">
                      Pending
                    </span>
                  ) : (
                    <span className="badge badge-error">
                      Cancelled
                    </span>
                  )}
                </td>

                <td>
                  <button
                    disabled={
                      booking.status === "Cancelled"
                    }
                    onClick={() =>
                      handleCancel(booking._id)
                    }
                    className="btn btn-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </PrivateRoute>
    
  );
}