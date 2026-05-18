"use client";

import React from "react";

const TeachSection = () => {

    const stats = [
        { label: "LEARNERS", value: "12k+" },
        { label: "TUTORS", value: "850+" },
        { label: "SESSIONS", value: "50k+" },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">


                <div
                    className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12"
                    style={{
                        background: "linear-gradient(135deg, #0675c1 0%, #7c83e5 50%, #00b3e5 100%)"
                    }}
                >


                    <div className="text-white max-w-xl text-center md:text-left z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
                            Teach what you love
                        </h2>
                        <p className="text-white/90 text-lg md:text-xl mb-10 font-medium leading-relaxed">
                            Share your expertise, set your own rates, and reach motivated learners around the world.
                        </p>
                        <button className="bg-white text-[#0675c1] hover:text-white hover:bg-[#0675c1] border-2 border-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl active:scale-95">
                            List your services
                        </button>
                    </div>


                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 z-10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2rem] p-6 md:p-10 w-32 md:w-48 text-center flex flex-col justify-center items-center shadow-2xl transition-transform duration-500 hover:scale-105"
                            >
                                <div className="text-white text-3xl md:text-5xl font-black mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/60 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-20 -mb-20 blur-2xl"></div>

                </div>
            </div>
        </section>
    );
};

export default TeachSection;