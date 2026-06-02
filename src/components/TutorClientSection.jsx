"use client";

import { useState } from "react";
import BookButton from "./BookButton";

export default function TutorClientSection({ tutor }) {
  const [slots, setSlots] = useState(tutor.totalSlot);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border h-fit sticky top-6">
      
      <h2 className="text-3xl font-bold text-[#0675C1]">
        ${tutor.hourlyFee}/hr
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Total Available Slots:{" "}
        <span className="font-bold text-gray-700">
          {slots}
        </span>
      </p>

      <BookButton
        tutor={tutor}
        slots={slots}
        setSlots={setSlots}
      />
    </div>
  );
}