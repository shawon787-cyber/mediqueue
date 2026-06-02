"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { toast } from "react-toastify";

const AddTutorPage = () => {
    const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const tutorData = Object.fromEntries(formData.entries());

  tutorData.hourlyFee = Number(tutorData.hourlyFee);
  tutorData.totalSlot = Number(tutorData.totalSlot);
  tutorData.createdAt = new Date();

  try {
    const res = await fetch("http://localhost:5000/tutors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorData),
    });

    const data = await res.json();

    console.log(data);

    if (data.insertedId || data.acknowledged) {
      toast.success("Tutor Added Successfully");
      e.target.reset();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
    return (
        <PrivateRoute>
            <div className="max-w-xl mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-5">Add New Tutor</h2>
            <form onSubmit={onSubmit} className="p-10 space-y-8 shadow-lg rounded-xl bg-gray-50 ">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Tutor Name */}
    <div className="md:col-span-2">
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Tutor Name
        </span>
      </label>

      <input
        type="text"
        name="tutorName"
        placeholder="Dr. John Doe"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Photo URL */}
    <div className="md:col-span-2">
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Photo URL (imgbb/postimage)
        </span>
      </label>

      <input
        type="url"
        name="photo"
        placeholder="https://i.ibb.co/example.jpg"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Subject */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Subject / Category
        </span>
      </label>

      <select
        name="subject"
        className="select select-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      >
        <option disabled selected>
          Select Subject
        </option>

        <option>Mathematics</option>
        <option>Physics</option>
        <option>Chemistry</option>
        <option>Biology</option>
        <option>English</option>
        <option>ICT</option>
        <option>Medical Science</option>
      </select>
    </div>

    {/* Teaching Mode */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Teaching Mode
        </span>
      </label>

      <select
        name="teachingMode"
        className="select select-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      >
        <option disabled selected>
          Select Mode
        </option>

        <option>Online</option>
        <option>Offline</option>
        <option>Both</option>
      </select>
    </div>

    {/* Available Days */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Available Days
        </span>
      </label>

      <input
        type="text"
        name="availableDays"
        placeholder="Sun - Thu"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Available Time */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Available Time Slot
        </span>
      </label>

      <input
        type="text"
        name="timeSlot"
        placeholder="5:00 PM - 8:00 PM"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Hourly Fee */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Hourly Fee
        </span>
      </label>

      <input
        type="number"
        name="hourlyFee"
        placeholder="500"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Total Slot */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Total Slot
        </span>
      </label>

      <input
        type="number"
        name="totalSlot"
        placeholder="20"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Session Start Date */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Session Start Date
        </span>
      </label>

      <input
        type="date"
        name="sessionStartDate"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Location */}
    <div>
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Location (Area / City)
        </span>
      </label>

      <input
        type="text"
        name="location"
        placeholder="Dhaka, Bangladesh"
        className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#0675c1]"
        required
      />
    </div>

    {/* Institution & Experience */}
    <div className="md:col-span-2">
      <label className="label">
        <span className="label-text font-semibold text-slate-700">
          Institution & Experience
        </span>
      </label>

      <textarea
        name="institutionExperience"
        placeholder="MBBS from Dhaka Medical College with 5 years teaching experience..."
        className="textarea textarea-bordered w-full rounded-xl min-h-[140px] focus:outline-none focus:border-[#0675c1]"
        required
      ></textarea>
    </div>

  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="btn w-full rounded-xl border-none bg-gradient-to-t from-[#0675c1] to-[#0a8bd8] hover:bg-[#055a95] text-white text-base font-semibold shadow-lg transition-all"
  >
    {/* {isPending ? "Adding Tutor..." : "Add Tutor"} */}
    Add Tutor
  </button>

</form>
        </div>
        </PrivateRoute>
    );
};
        
    

export default AddTutorPage;