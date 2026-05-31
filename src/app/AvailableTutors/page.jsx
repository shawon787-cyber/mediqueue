import React from 'react';
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

const AvailableTutors = async () => {
    const res = await fetch("http://localhost:5000/tutors");
    const tutors = await res.json();
    return (
        <div className="container px-4 mx-auto py-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className='text-gray-800 font-bold text-3xl'>Available Tutors</h2>
                    <p className='text-sm text-gray-500'>Top-rated experts ready to teach.</p>
                </div>
                <Link href="/tutors">
                <button className='bg-[#0675C1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg cursor-pointer'>
                    View All
                </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {tutors.map((tutor) => (
                    <div key={tutor._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                        <div>
                            <img
                                src={tutor.photo}
                                alt={tutor.tutorName}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />

                            <div className="p-5">
                                <h2 className="card-title">{tutor.tutorName}</h2>

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

                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold">
                                        <span className="text-[#0675C1]">${tutor.hourlyFee.toFixed(2)}</span><span className="text-gray-500 text-sm font-mono">/hr</span>
                                    </p>
                                    <Link href={`/tutors/${tutor._id}`}>
                                        <button className="btn bg-[#0675C1] text-white hover:bg-[#0675C1] shadow-lg rounded-md">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableTutors;