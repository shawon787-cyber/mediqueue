import { IoBookOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

const TutorsPage = async () => {
    const res = await fetch("http://localhost:5000/tutors");
    const tutors = await res.json();

    return (
        <div className="container px-4 mx-auto py-12">
            
            <div className="bg-gradient-to-r from-[#c7e4f7] via-[#eef7fd] to-[#e7f3fc] rounded-3xl p-10 mb-10">
    <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Find your tutor
    </h1>

    <p className="text-gray-500 mb-8">
        Search by name or filter by session date.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
            type="text"
            placeholder="Search tutors..."
            className="input input-bordered w-full"
        />

        <input
            type="date"
            className="input input-bordered w-full"
        />

        <input
            type="date"
            className="input input-bordered w-full"
        />
    </div>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                    <button className="btn bg-[#0675C1] text-white hover:bg-[#0675C1] shadow-lg rounded-md">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorsPage;