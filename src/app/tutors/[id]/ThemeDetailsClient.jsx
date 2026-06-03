"use client";

import { useTheme } from "@/components/ThemeContext";
import {
  IoBookOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiVideoChatLine } from "react-icons/ri";
import Link from "next/link";
import TutorClientSection from "@/components/TutorClientSection";

export default function ThemeDetailsClient({ tutor }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`container mx-auto px-4 py-10 ${
        isDark ? "text-gray-200" : ""
      }`}
    >
      <Link
        href="/tutors"
        className={
          isDark ? "text-[#67aefb] hover:underline" : "text-blue-600 underline"
        }
      >
        ← Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div
          className={`lg:col-span-2 rounded-3xl overflow-hidden shadow-sm border ${
            isDark
              ? "bg-[#111827] border-gray-800"
              : "bg-white border-gray-100"
          }`}
        >
          <img
            src={tutor.photo}
            alt={tutor.tutorName}
            className="w-full h-[450px] object-cover"
          />

          <div className={`p-8 ${isDark ? "text-gray-200" : ""}`}>
            <h1
              className={`text-4xl font-bold ${
                isDark ? "text-[#67aefb]" : "text-[#0675C1]"
              }`}
            >
              {tutor.tutorName}
            </h1>

            <div
              className={`mt-2 flex flex-wrap items-center gap-4 font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="flex items-center gap-2">
                <IoBookOutline
                  className={
                    isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                  }
                />
                {tutor.subject}
              </p>

              <span
                className={
                  isDark ? "text-gray-700" : "text-gray-300"
                }
              >
                |
              </span>

              <p
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  isDark
                    ? "bg-[#111827] text-[#67aefb] border border-gray-700"
                    : "bg-blue-50 text-[#0675C1]"
                }`}
              >
                <RiVideoChatLine />
                {tutor.teachingMode}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border mt-6 ${
                isDark
                  ? "bg-[#0f1623] border-gray-800 text-gray-300"
                  : "text-gray-600 bg-gray-50 border-gray-100"
              }`}
            >
              <p>
                <span
                  className={`font-bold flex items-center gap-2 mb-1 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <HiOutlineBuildingOffice2
                    className={
                      isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                    }
                  />
                  Experience:
                </span>
                {tutor.institutionExperience ||
                  "No experience details provided."}
              </p>
            </div>

            <div
              className={`grid md:grid-cols-2 gap-6 mt-8 p-6 rounded-2xl ${
                isDark
                  ? "bg-[#0f1623] border border-gray-800"
                  : "bg-gray-50"
              }`}
            >
              <p
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MdOutlineDateRange
                  className={
                    isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                  }
                />
                <strong>Start Date:</strong> {tutor.sessionStartDate}
              </p>

              <p
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <IoTimeOutline
                  className={
                    isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                  }
                />
                <strong>Time Slot:</strong> {tutor.timeSlot}
              </p>

              <p
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <PiStudent
                  className={
                    isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                  }
                />
                <strong>Available Days:</strong> {tutor.availableDays}
              </p>

              <p
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <IoLocationOutline
                  className={
                    isDark ? "text-[#67aefb]" : "text-[#0675C1]"
                  }
                />
                <strong>Location:</strong> {tutor.location}
              </p>
            </div>

            {tutor.createdAt && (
              <p
                className={`mt-6 text-xs italic ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Posted on:{" "}
                {new Date(tutor.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>

        <TutorClientSection tutor={tutor} />
      </div>
    </div>
  );
}