import {
  IoBookOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Link from "next/link";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/tutors/${id}`, {
    cache: "no-store",
  });

  const tutor = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href="/tutors"
        className="inline-flex items-center gap-2 mb-8 text-sm hover:text-[#0675C1]"
      >
        ← Back to tutors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm">
          <img
            src={tutor.photo}
            alt={tutor.tutorName}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-5xl font-bold text-[#0675C1]">
                  {tutor.tutorName}
                </h1>

                <p className="flex items-center gap-2 mt-3 text-gray-600">
                  <IoBookOutline />
                  {tutor.subject}
                </p>
              </div>

              <span className="bg-[#0675C1]/10 text-[#0675C1] px-4 py-2 rounded-full text-sm font-medium">
                {tutor.totalSlot} slots left
              </span>
            </div>

            <p className="mt-8 text-gray-600">
              {tutor.institutionExperience}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <HiOutlineBuildingOffice2
                      size={22}
                      className="text-[#0675C1]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="font-semibold">
                      {tutor.institutionExperience}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <MdOutlineDateRange
                      size={22}
                      className="text-[#0675C1]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Session date</p>
                    <p className="font-semibold">
                      {tutor.sessionStartDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <PiStudent size={22} className="text-[#0675C1]" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Available days</p>
                    <p className="font-semibold">
                      {tutor.availableDays}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <PiStudent size={22} className="text-[#0675C1]" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Teaching mode</p>
                    <p className="font-semibold">
                      {tutor.teachingMode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <IoTimeOutline
                      size={22}
                      className="text-[#0675C1]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Available time</p>
                    <p className="font-semibold">{tutor.timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#0675C1]/10 p-3 rounded-xl">
                    <IoLocationOutline
                      size={22}
                      className="text-[#0675C1]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{tutor.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-3xl p-8 shadow-sm h-fit sticky top-5">
          <p className="text-gray-500 mb-3">Hourly rate</p>

          <h2 className="text-5xl font-bold text-[#0675C1]">
            ${tutor.hourlyFee}
            <span className="text-xl text-gray-500">/hr</span>
          </h2>

          <div className="border-t my-8"></div>

          <button className="w-full py-4 rounded-xl font-semibold text-white bg-[#0675C1] hover:bg-[#0563a5] transition">
            Book Session
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            No payment required to reserve
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;