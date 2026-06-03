"use client";

import { useRef, useEffect, useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useTheme } from "@/components/ThemeContext";
import { fetchTutors } from "@/lib/api";

function TutorCard({ tutor, index }) {
  const { isDark } = useTheme();

  return (
    <StaggerItem
      delay={index * 0.07}
      className={`rounded-lg overflow-hidden ${
        isDark
          ? "bg-[#111827] shadow-lg shadow-black/40 border border-gray-800/40"
          : "bg-base-100 shadow-md"
      }`}
    >
      <img
        src={tutor.photo}
        alt={tutor.tutorName}
        className={`w-full h-64 object-cover ${isDark ? "opacity-90" : ""}`}
      />
      <div className="p-5">
        <h2 className="card-title">{tutor.tutorName}</h2>
        <p className={`flex items-center gap-1 text-sm mt-2 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
          <IoBookOutline />
          {tutor.subject}
        </p>
        <div className="flex flex-wrap items-center gap-4 my-2">
          <p className={`flex items-center gap-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            <MdOutlineDateRange />
            {tutor.sessionStartDate}
          </p>
          <p className={`flex items-center gap-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            <IoMdTime />
            {tutor.timeSlot}
          </p>
          <p className={`flex items-center gap-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            <CiLocationOn />
            {tutor.location}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className={`font-bold ${isDark ? "text-[#67aefb]" : "text-[#0675C1]"}`}>${tutor.hourlyFee}/hr</p>
          <Link href={`/tutors/${tutor._id}`}>
            <button className={`btn text-white ${isDark ? "bg-[#67aefb] hover:bg-[#4a9ce0]" : "bg-[#0675C1] hover:bg-blue-700"}`}>Book Session</button>
          </Link>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const abortRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    fetchTutors(search, startDate, endDate)
      .then((data) => {
        if (data.success) {
          setTutors(data.data || []);
        }
      })
      .catch((e) => console.error(e));
    return () => abortRef.current?.abort();
  }, [search, startDate, endDate]);

  const filterBg = isDark
    ? "bg-gradient-to-r from-[#0f1d2f] via-[#0b1626] to-[#0d1b2a] border border-gray-800/40"
    : "bg-gradient-to-r from-[#c7e4f7] via-[#eef7fd] to-[#e7f3fc]";

  const inputDark = "bg-[#111827] border-gray-700 text-gray-200";
  const inputLight = "";

  return (
    <div className="container px-4 mx-auto py-12">
      <div className={`${filterBg} rounded-3xl p-10 mb-10`}>
        <h1 className={`text-5xl font-bold mb-4 ${
          isDark ? "text-[#67b8f5]" : "text-[#0675C1]"
        }`}>
          Find your tutor
        </h1>
        <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Search by name or filter by date.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search tutors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`input input-bordered w-full ${isDark ? inputDark : ""}`}
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`input input-bordered w-full ${isDark ? inputDark : ""}`}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`input input-bordered w-full ${isDark ? inputDark : ""}`}
          />
        </div>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor, i) => (
          <TutorCard key={tutor._id} tutor={tutor} index={i} />
        ))}
      </StaggerContainer>

      {tutors.length === 0 && (
        <p className={`text-center mt-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          No tutors found
        </p>
      )}
    </div>
  );
}
