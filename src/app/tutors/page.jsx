"use client";

import { useEffect, useState } from "react";
import {
  IoBookOutline,
} from "react-icons/io5";
import {
  MdOutlineDateRange,
} from "react-icons/md";
import {
  IoMdTime,
} from "react-icons/io";
import {
  CiLocationOn,
} from "react-icons/ci";
import Link from "next/link";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔄 Fetch Tutors
  const fetchTutors = async () => {
    const res = await fetch(
      `http://localhost:5000/tutors?search=${search}&startDate=${startDate}&endDate=${endDate}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    setTutors(data.data || []);
  };

  // 🔁 Auto fetch on change
  useEffect(() => {
    fetchTutors();
  }, [search, startDate, endDate]);

  return (
    <div className="container px-4 mx-auto py-12">

      {/* 🔍 SEARCH + FILTER UI */}
      <div className="bg-gradient-to-r from-[#c7e4f7] via-[#eef7fd] to-[#e7f3fc] rounded-3xl p-10 mb-10">

        <h1 className="text-5xl font-bold mb-4 text-[#0675C1]">
          Find your tutor
        </h1>

        <p className="text-gray-500 mb-8">
          Search by name or filter by date.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search tutors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* START DATE */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* END DATE */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* 🧑‍🏫 TUTOR LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-base-100 shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={tutor.photo}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">

              <h2 className="card-title">
                {tutor.tutorName}
              </h2>

              <p className="text-gray-500 flex items-center gap-1 text-sm mt-2">
                <IoBookOutline />
                {tutor.subject}
              </p>

              <div className="flex items-center gap-4 my-2">

                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <MdOutlineDateRange />
                  {tutor.sessionStartDate}
                </p>

                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <IoMdTime />
                  {tutor.timeSlot}
                </p>

                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <CiLocationOn />
                  {tutor.location}
                </p>

              </div>

              <div className="flex justify-between items-center">

                <p className="font-bold text-[#0675C1]">
                  ${tutor.hourlyFee}/hr
                </p>

                <Link href={`/tutors/${tutor._id}`}>
                  <button className="btn bg-[#0675C1] text-white">
                    Book Session
                  </button>
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {tutors.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No tutors found
        </p>
      )}

    </div>
  );
}