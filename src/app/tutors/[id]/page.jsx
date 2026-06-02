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

export default async function TutorDetailsPage({ params }) {
  const { id } =await params;

  const res = await fetch(`http://127.0.0.1:5000/tutors/${id}`, {
    cache: "no-store",
  });

  let data;

  try {
    data = await res.json();
  } catch (err) {
    return (
      <div className="text-center py-20 text-red-500">
        Backend response broken (not JSON)
      </div>
    );
  }

  if (!res.ok || !data?.success) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-2xl font-bold">
          Failed to load tutor
        </h2>
        <p>API Status: {res.status}</p>

        <Link href="/tutors" className="text-blue-600 underline mt-4 block">
          Go back
        </Link>
      </div>
    );
  }

  const tutor = data.data;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/tutors" className="text-blue-600 underline">
        ← Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          
          <img
            src={tutor.photo}
            alt={tutor.tutorName}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#0675C1]">
              {tutor.tutorName}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600 font-medium">
              <p className="flex items-center gap-2">
                <IoBookOutline className="text-[#0675C1]" />
                {tutor.subject}
              </p>

              <span className="text-gray-300">|</span>

              <p className="flex items-center gap-2 bg-blue-50 text-[#0675C1] px-3 py-1 rounded-full text-sm">
                <RiVideoChatLine />
                {tutor.teachingMode}
              </p>
            </div>

            <div className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 mt-6">
              <p>
                <span className="font-bold flex items-center gap-2 text-gray-700 mb-1">
                  <HiOutlineBuildingOffice2 className="text-[#0675C1]" />
                  Experience:
                </span>
                {tutor.institutionExperience ||
                  "No experience details provided."}
              </p>
            </div>

            {/* DETAILS GRID */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 bg-gray-50 p-6 rounded-2xl">
              
              <p className="flex items-center gap-2 text-gray-700">
                <MdOutlineDateRange className="text-[#0675C1]" />
                <strong>Start Date:</strong> {tutor.sessionStartDate}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <IoTimeOutline className="text-[#0675C1]" />
                <strong>Time Slot:</strong> {tutor.timeSlot}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <PiStudent className="text-[#0675C1]" />
                <strong>Available Days:</strong> {tutor.availableDays}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <IoLocationOutline className="text-[#0675C1]" />
                <strong>Location:</strong> {tutor.location}
              </p>
            </div>

            {tutor.createdAt && (
              <p className="mt-6 text-xs text-gray-400 italic">
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

        {/* RIGHT SIDE */}
        <TutorClientSection tutor={tutor} />

      </div>
    </div>
  );
}