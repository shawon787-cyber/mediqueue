"use client";

import { HiOutlineBadgeCheck, HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi";
import { useTheme } from "@/components/ThemeContext";

const WhyMediQueue = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <ThemeHeader />
        <FeaturesGrid />
      </div>
    </section>
  );
};

function ThemeHeader() {
  const { isDark } = useTheme();

  return (
    <div className="text-center mb-16">
      <h5
        className={`font-bold tracking-widest uppercase text-sm mb-3 ${
          isDark ? "text-[#67aefb]" : "text-[#0675c1]"
        }`}
      >
        WHY MEDIQUEUE
      </h5>
      <h2
        className={`text-3xl md:text-5xl font-bold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        Learning that actually sticks
      </h2>
    </div>
  );
}

function FeaturesGrid() {
  const { isDark } = useTheme();
  const features = [
    {
      id: 1,
      icon: <HiOutlineBadgeCheck className="text-white text-2xl" />,
      title: "Verified medical tutors",
      description:
        "Every tutor's credentials and clinical experience are strictly reviewed before joining.",
    },
    {
      id: 2,
      icon: <HiOutlineCalendar className="text-white text-2xl" />,
      title: "Flexible booking",
      description:
        "Reserve your session in seconds — slots update in real time based on tutor availability.",
    },
    {
      id: 3,
      icon: <HiOutlineUsers className="text-white text-2xl" />,
      title: "One-on-one focus",
      description:
        "Personalized sessions designed around your exam goals with instant feedback.",
    },
  ];

  const cardBase =
    "p-8 rounded-2xl border transition-all duration-300 group shadow-md";

  function cardClasses(dark) {
    return dark
      ? `${cardBase} bg-[#111827] border-gray-800 text-gray-200`
      : `${cardBase} bg-slate-50/30 border-slate-100 text-slate-900 hover:shadow-xl hover:shadow-blue-500/5`;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div
          key={feature.id}
          className={`${cardClasses(isDark)} ${
            isDark
              ? "hover:shadow-xl hover:shadow-blue-500/10"
              : "hover:shadow-xl hover:shadow-blue-500/5"
          } group`}
        >
          <div
            className={`w-12 h-12 rounded-xl bg-[#0675c1] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}
          >
            {feature.icon}
          </div>

          <h3
            className={`text-xl font-bold mb-3 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {feature.title}
          </h3>
          <p
            className={`leading-relaxed ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WhyMediQueue;