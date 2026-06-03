"use client";

import { useState } from "react";
import BookButton from "./BookButton";
import { useTheme } from "@/components/ThemeContext";

export default function TutorClientSection({ tutor }) {
  const [slots, setSlots] = useState(tutor.totalSlot);
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 rounded-3xl shadow-md border h-fit sticky top-6 ${
        isDark ? "bg-[#111827] border-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold ${
          isDark ? "text-[#67aefb]" : "text-[#0675C1]"
        }`}
      >
        ${tutor.hourlyFee}/hr
      </h2>

      <p
        className={`text-sm mt-1 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Total Available Slots:{" "}
        <span
          className={`font-bold ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
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