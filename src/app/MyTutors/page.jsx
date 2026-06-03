"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTheme } from "@/components/ThemeContext";
import { fetchTutors, deleteTutor } from "@/lib/api";

const MyTutorsPage = () => {
  const { isDark } = useTheme();
  const [tutors, setTutors] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchTutors()
      .then((data) => {
        if (data.success) {
          setTutors(data.data || []);
        }
      });
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
    const data = await deleteTutor(selectedId);

    if (data.success) {
      setTutors((prev) =>
        prev.filter((t) => t._id !== selectedId)
      );
      toast.success("Tutor deleted successfully 🗑️");
    } else {
      toast.error("Delete failed ❌");
    }

    closeDeleteModal();
  };

  return (
    <PrivateRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container px-4 mx-auto py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-bold text-3xl mb-8 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          My Tutors
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`overflow-x-auto rounded-3xl shadow-sm ${
            isDark ? "bg-[#111827]" : "bg-white"
          }`}
        >
          <table className="table w-full">
            <thead className={isDark ? "bg-[#1a2235]" : "bg-gray-100"}>
                <tr>
                  <th>Tutor</th>
                  <th>Subject</th>
                  <th>Fee</th>
                  <th>Slots</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tutors.map((tutor) => (
                  <tr key={tutor._id}>
                    <td className="font-semibold">{tutor.tutorName}</td>
                    <td>{tutor.subject}</td>
                    <td>${tutor.hourlyFee}</td>
                    <td>{tutor.totalSlot}</td>
                    <td>{tutor.sessionStartDate}</td>

                    <td>
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => handleDeleteClick(tutor._id)}
                          className="text-red-500"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {isDeleteOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-[350px] p-6 rounded-2xl text-center ${
                  isDark
                    ? "bg-[#111827] text-gray-200"
                    : "bg-white text-gray-900"
                }`}
              >
                <h2 className="text-lg font-bold mb-3">Are you sure?</h2>

                <p
                  className={`mb-5 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className={`px-4 py-2 rounded ${
                      isDark
                        ? "bg-[#111827] text-gray-300"
                        : "bg-gray-200"
                    }`}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </PrivateRoute>
    );
  };

export default MyTutorsPage;