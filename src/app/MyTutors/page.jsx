"use client";

import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const MyTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    tutorName: "",
    subject: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
  });

  // =====================
  // LOAD DATA
  // =====================
  useEffect(() => {
    fetch("http://localhost:5000/tutors")
      .then((res) => res.json())
      .then((data) => setTutors(data.data || data));
  }, []);

  // =====================
  // EDIT OPEN
  // =====================
  const handleEdit = (tutor) => {
    setSelectedId(tutor._id);
    setFormData({
      tutorName: tutor.tutorName,
      subject: tutor.subject,
      hourlyFee: tutor.hourlyFee,
      totalSlot: tutor.totalSlot,
      sessionStartDate: tutor.sessionStartDate,
    });
    setIsModalOpen(true);
  };

  // =====================
  // DELETE OPEN
  // =====================
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  // =====================
  // CLOSE MODALS
  // =====================
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // UPDATE
  // =====================
  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/tutors/${selectedId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (data.success) {
      setTutors((prev) =>
        prev.map((t) =>
          t._id === selectedId ? { ...t, ...formData } : t
        )
      );

      toast.success("Tutor updated successfully ✅");
      closeModal();
    } else {
      toast.error("Update failed ❌");
    }
  };

  // =====================
  // DELETE CONFIRM
  // =====================
  const confirmDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/tutors/${selectedId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

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
    <div className="container px-4 mx-auto py-12">
      <h2 className="text-gray-800 font-bold text-3xl mb-8">
        My Tutors
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-100">
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
                      onClick={() => handleEdit(tutor)}
                      className="text-[#0675C1]"
                    >
                      <FiEdit size={18} />
                    </button>

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
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Update Tutor
            </h2>

            <div className="space-y-3">
              <input
                name="tutorName"
                value={formData.tutorName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="hourlyFee"
                value={formData.hourlyFee}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                type="number"
              />

              <input
                name="totalSlot"
                value={formData.totalSlot}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                type="number"
              />

              <input
                name="sessionStartDate"
                value={formData.sessionStartDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                type="date"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#0675C1] text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-2xl text-center">
            <h2 className="text-lg font-bold mb-3">
              Are you sure?
            </h2>

            <p className="text-gray-500 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 rounded"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutorsPage;