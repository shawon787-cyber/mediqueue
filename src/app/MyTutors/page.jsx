import { FiEdit, FiTrash2 } from "react-icons/fi";

const MyTutorsPage = async () => {
  const res = await fetch("http://localhost:5000/tutors");
  const tutors = await res.json();

  return (
    <div className="container px-4 mx-auto py-12">
      <h2 className="text-gray-800 font-bold text-3xl mb-8">
        My Tutors
      </h2>

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
                <td className="font-semibold">
                  {tutor.tutorName}
                </td>

                <td>{tutor.subject}</td>

                <td>${tutor.hourlyFee}</td>

                <td>{tutor.totalSlot}</td>

                <td>{tutor.sessionStartDate}</td>

                <td>
                  <div className="flex justify-end gap-4">
                    <button className="text-gray-700 hover:text-[#0675C1]">
                      <FiEdit size={18} />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTutorsPage;