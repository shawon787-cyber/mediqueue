"use client";

import Link from "next/link";
import {
    FaXTwitter,
    FaLinkedinIn,
    FaGithub,
    FaEnvelope,
    FaLocationDot
} from "react-icons/fa6";
import { useTheme } from "./ThemeContext";

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className={`w-full pt-16 pb-8 transition-colors duration-400 border-t ${
            theme === "dark"
                ? "bg-[#0f1623] border-gray-800 text-gray-300"
                : "bg-[#f8fafc] border-slate-200 text-slate-600"
        }`}>
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">

                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg bg-[#0675c1]">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>

                            <span className={`text-2xl font-bold tracking-tight ${
                                theme === "dark" ? "text-white" : "text-slate-800"
                            }`}>
                                MediQueue
                            </span>
                        </div>

                        <p className={`text-base leading-relaxed max-w-sm ${
                            theme === "dark" ? "text-gray-400" : ""
                        }`}>
                            Find the right medical tutor for your goals.
                            Book live medical sessions in any subject,
                            online or in person.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-3">
                        <h4 className={`font-bold mb-5 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>
                            Services
                        </h4>

                        <ul className="space-y-3 font-medium">
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-[#0675c1] transition-colors"
                                >
                                    Browse tutors
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/add-tutor"
                                    className="hover:text-[#0675c1] transition-colors"
                                >
                                    Become a tutor
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-tutors"
                                    className="hover:text-[#0675c1] transition-colors"
                                >
                                    My bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-4">
                        <h4 className={`font-bold mb-5 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>
                            Contact
                        </h4>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#0675c1]" />
                                <span className="font-medium hover:underline cursor-pointer">
                                    hello@mediqueue.app
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaLocationDot className="text-[#0675c1]" />
                                <span className="font-medium">
                                    Remote • Worldwide
                                </span>
                            </div>

                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-8">
                            {[FaXTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-[#0675c1] transition-transform hover:scale-110 shadow-md"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-slate-200 text-center">
                    <p className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-500" : "text-slate-400"
                    }`}>
                        Copyright © {new Date().getFullYear()} MediQueue.
                        All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;