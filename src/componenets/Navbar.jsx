"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navLinks = (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tutors">Tutors</Link></li>
            <li><Link href="/add-tutor">Add Tutor</Link></li>
            <li><Link href="/MyTutors">My Tutors</Link></li>
            <li><Link href="/booked-sessions">My Booked Sessions</Link></li>
            <li><Link href="/sign-up">Register</Link></li>
            <li><Link href="/Login">Login</Link></li>
        </>
    );

    return (

        <div className="w-full bg-base-100 shadow relative">


            <div className="navbar container mx-auto px-4 min-h-[4rem]">


                <div className="flex-1">
                    <Link href="/" className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md"
                            style={{ background: "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                        </div>
                        <span className="text-xl font-bold text-[#0675c1]">MediQueue</span>
                    </Link>
                </div>


                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>


                <div className="flex items-center gap-2">


                    <ThemeToggle />


                    <div className="lg:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="btn btn-square btn-ghost"
                        >
                            ☰
                        </button>
                    </div>

                </div>


                {open && (

                    <div className="absolute top-16 left-0 w-full bg-base-100 shadow-lg lg:hidden z-50 border-t border-base-200">
                        <ul className="menu p-4 gap-2">
                            {navLinks}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
}