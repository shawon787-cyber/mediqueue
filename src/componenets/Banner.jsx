"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
    const slides = [
        {
            id: 1,
            tag: "Trusted by learners",
            title: "Real progress, real outcomes",
            description: "Thousands of sessions delivered by verified tutors.",
            primaryBtn: "Browse tutors",
            secondaryBtn: "Become a tutor",
            gradient: "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)",
        },
        {
            id: 2,
            tag: "Flexible scheduling",
            title: "Book sessions that fit your life",
            description: "Pick a date, time, and mode — online or in person.",
            primaryBtn: "Browse tutors",
            secondaryBtn: "Become a tutor",
            gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        },
        {
            id: 3,
            tag: "Expert Mentorship",
            title: "Accelerate your medical career",
            description: "Learn from specialists who have already walked the path.",
            primaryBtn: "Get Started",
            secondaryBtn: "Learn More",
            gradient: "linear-gradient(135deg, #0675c1 0%, #455cd6 100%)",
        },
    ];

    return (
        <div className="w-full bg-base-100">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-[450px] md:h-[500px] w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative w-full h-full flex items-center"
                            style={{ background: slide.gradient }}
                        >
                            <div className="container mx-auto px-6 w-full">
                                <div className="max-w-2xl text-white">

                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium mb-6">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        {slide.tag}
                                    </div>


                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                                        {slide.title}
                                    </h1>


                                    <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">
                                        {slide.description}
                                    </p>


                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href="/tutors"
                                            className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg"
                                        >
                                            {slide.primaryBtn} <HiArrowRight />
                                        </Link>
                                        <Link
                                            href="/add-tutor"
                                            className="bg-transparent border border-white/40 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
                                        >
                                            {slide.secondaryBtn}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}


                <div className="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                    <button className="custom-prev text-white hover:text-white/70 transition cursor-pointer"><HiArrowLeft size={20} /></button>
                    <div className="custom-pagination !flex !gap-2 items-center"></div>
                    <button className="custom-next text-white hover:text-white/70 transition cursor-pointer"><HiArrowRight size={20} /></button>
                </div>
            </Swiper>


            <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #fff !important;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
        </div>
    );
};

export default Banner;