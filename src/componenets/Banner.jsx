"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    tag: "Trusted by learners",
    title: "Real progress, real outcomes",
    description: "Thousands of sessions delivered by verified tutors.",
    primaryBtn: "Browse tutors",
    secondaryBtn: "Become a tutor",
    gradient: "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)",
    image:
      "https://placehold.co/700x700/0675c1/ffffff/png?text=Medical+Student",
  },
  {
    id: 2,
    tag: "Flexible scheduling",
    title: "Book sessions that fit your life",
    description: "Pick a date, time, and mode — online or in person.",
    primaryBtn: "Browse tutors",
    secondaryBtn: "Become a tutor",
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    image:
      "https://placehold.co/700x700/6366f1/ffffff/png?text=Online+Learning",
  },
  {
    id: 3,
    tag: "Expert Mentorship",
    title: "Accelerate your medical career",
    description:
      "Learn from specialists who have already walked the path.",
    primaryBtn: "Browse tutors",
    secondaryBtn: "Become a tutor",
    gradient: "linear-gradient(135deg, #0675c1 0%, #455cd6 100%)",
    image:
      "https://placehold.co/700x700/455cd6/ffffff/png?text=Doctor+Mentor",
  },
];

export default function Banner() {
  return (
    <div className="w-full bg-base-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-[550px] md:h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex items-center h-full overflow-hidden"
              style={{ background: slide.gradient }}
            >
              <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl" />

              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                  <div className="max-w-2xl text-white z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium mb-6">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      {slide.tag}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 mb-10">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/tutors"
                        className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition"
                      >
                        {slide.primaryBtn}
                        <HiArrowRight />
                      </Link>

                      <Link
                        href="/add-tutor"
                        className="border border-white/40 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition"
                      >
                        {slide.secondaryBtn}
                      </Link>
                    </div>
                  </div>

                  <div className="hidden lg:flex justify-center items-center relative">
                    <div className="absolute w-[420px] h-[420px] bg-white/10 rounded-full blur-2xl"></div>

                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={430}
                      height={430}
                      priority={slide.id === 1}
                      className="relative z-10 w-[380px] xl:w-[430px] h-auto object-contain drop-shadow-2xl animate-float"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
          <button className="custom-prev text-white">
            <HiArrowLeft size={20} />
          </button>

          <div className="custom-pagination !flex !gap-2"></div>

          <button className="custom-next text-white">
            <HiArrowRight size={20} />
          </button>
        </div>
      </Swiper>
    </div>
  );
}