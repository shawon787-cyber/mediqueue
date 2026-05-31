import React from "react";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

const AvailableTutors = async () => {
  const res = await fetch("http://localhost:5000/tutors", {
    cache: "no-store", // always fresh data (important in Next.js)
  });

  const data = await res.json();

  const tutors = data.data || [];

  return (
    <div className="container px-4 mx-auto py-12">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-800 font-bold text-3xl">
            Available Tutors
          </h2>
          <p className="text-sm text-gray-500">
            Top-rated experts ready to teach.
          </p>
        </div>

        <Link href="/tutors">
          <button className="bg-[#0675C1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg">
            View All
          </button>
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.isArray(tutors) &&
          tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <img
                src={tutor.photo}
                alt={tutor.tutorName}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                {/* NAME */}
                <h2 className="text-lg font-bold">
                  {tutor.tutorName}
                </h2>

                {/* SUBJECT */}
                <p className="text-gray-500 flex items-center gap-1 text-sm mt-2">
                  <IoBookOutline />
                  {tutor.subject}
                </p>

                {/* INFO */}
                <div className="flex flex-wrap gap-3 my-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MdOutlineDateRange />
                    {tutor.sessionStartDate}
                  </span>

                  <span className="flex items-center gap-1">
                    <IoTimeOutline />
                    {tutor.timeSlot}
                  </span>

                  <span className="flex items-center gap-1">
                    <CiLocationOn />
                    {tutor.location}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold">
                    <span className="text-[#0675C1]">
                      ${Number(tutor.hourlyFee || 0).toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /hr
                    </span>
                  </p>

                  <Link href={`/tutors/${tutor._id}`}>
                    <button className="bg-[#0675C1] hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvailableTutors;