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

const TutorDetailsPage = async ({ params }) => {
  
 
  const resolvedParams = await params; 
  const { id } = resolvedParams;

 
  const res = await fetch(`http://localhost:5000/tutors/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const tutor = data?.data;

  
  if (!tutor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-2xl font-bold mb-4">No tutor found</h2>
        <p className="text-gray-500 mb-4">Requested ID: {id}</p>
        <Link href="/tutors" className="text-blue-600 hover:underline">
          Go back to Tutors List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/tutors" className="mb-6 inline-block text-blue-600 hover:underline">
        ← Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <p className="mt-6 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold flex items-center gap-2 text-gray-700 mb-1">
                <HiOutlineBuildingOffice2 className="text-[#0675C1]" /> Experience:
              </span>
              {tutor.institutionExperience || "No experience details provided."}
            </p>

            
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
                Posted on: {new Date(tutor.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            )}
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 h-fit sticky top-6">
          <h2 className="text-3xl font-bold text-[#0675C1]">
            ${tutor.hourlyFee ? Number(tutor.hourlyFee).toFixed(2) : "0.00"}/hr
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Available Slots: <span className="font-bold text-gray-700">{tutor.totalSlot || 0}</span>
          </p>

          <button className="w-full mt-6 bg-[#0675C1] text-white py-3 rounded-xl font-bold hover:bg-[#0564a4] transition-all shadow-lg shadow-blue-100">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;