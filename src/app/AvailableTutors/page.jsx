"use client";

import { useEffect, useState } from "react";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import BookingDetailsButton from "@/components/BookingDetailsButton";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useTheme } from "@/components/ThemeContext";
import { fetchTutors } from "@/lib/api";

const TutorCard = ({ tutor, index }) => {
  const { isDark } = useTheme();

  return (
    <StaggerItem
      delay={index * 0.07}
      className={`rounded-xl overflow-hidden ${
        isDark
          ? "bg-[#111827] shadow-lg shadow-black/40 border border-gray-800/[0.4]"
          : "bg-white shadow-md"
      }`}
    >
      <img
        src={tutor.photo}
        alt={tutor.tutorName}
        className={`w-full h-60 object-cover ${
          isDark ? "opacity-90" : ""
        }`}
      />
      <div className="p-5">
        <h2 className={`text-lg font-bold ${isDark ? "text-white" : ""}`}>{tutor.tutorName}</h2>
        <p className={`flex items-center gap-1 text-sm mt-2 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
          <IoBookOutline />
          {tutor.subject}
        </p>
        <div className={`flex flex-wrap gap-3 my-3 text-sm ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
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
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold">
            <span className={isDark ? "text-[#67aefb]" : "text-[#0675C1]"}>
              ${Number(tutor.hourlyFee || 0).toFixed(2)}
            </span>
            <span className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}> /hr</span>
          </p>
          <BookingDetailsButton tutorId={tutor._id} />
        </div>
      </div>
    </StaggerItem>
  );
};

export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchTutors()
      .then((data) => {
        if (data.success) {
          setTutors(data.data || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container px-4 mx-auto py-12">
      {/* HEADER */}
      <div className={`flex items-center justify-between mb-2 ${
        isDark ? "text-white" : ""
      }`}>
        <div>
          <h2 className={`font-bold text-3xl ${
            isDark ? "text-white" : "text-gray-800"
          }`}>
            Available Tutors
          </h2>
          <p className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
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
      {loading ? (
        <div className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Loading tutors...
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.isArray(tutors) &&
            tutors.map((tutor, i) => (
              <TutorCard key={tutor._id} tutor={tutor} index={i} />
            ))}
        </StaggerContainer>
      )}
    </div>
  );
}
