"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeContext";
import { useAuth } from "@/lib/AuthProvider";
import Image from "next/image";

export default function Navbar() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className="font-medium">
          Home
        </Link>
      </li>
      <li>
        <Link href="/tutors" className="font-medium">
          Tutors
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <Link href="/add-tutor" className="font-medium">
              Add Tutor
            </Link>
          </li>
          <li>
            <Link href="/MyTutors" className="font-medium">
              My Tutors
            </Link>
          </li>
          <li>
            <Link href="/my-booked-session" className="font-medium">
              My Booked Sessions
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header
      className={`w-full shadow relative transition-colors duration-400 ${
        theme === "dark"
          ? "bg-[#0f1623] border-b border-gray-800"
          : "bg-base-100"
      }`}
    >
      <div className="navbar container mx-auto px-4 min-h-16">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)",
              }}
            >
              <svg
                width="20"
                height="20"
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

            <span className="text-xl font-bold text-[#0675c1]">
              MediQueue
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  className={`w-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center overflow-hidden ${
                    theme === "dark"
                      ? "ring-[#0675C1] ring-offset-[#0f1623]"
                      : "ring-primary ring-offset-base-100"
                  }`}
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-lg font-semibold"
                      style={{ backgroundColor: "#0675C1" }}
                    >
                      {(user?.email?.[0] || user?.name?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-100 p-2 shadow rounded-box w-56 ${
                  theme === "dark"
                    ? "bg-[#111827] border border-gray-700 text-gray-200"
                    : "bg-base-100"
                }`}
              >
                <li className="menu-title">
                  <span>{user?.name || "Account"}</span>
                </li>
                <li>
                  <Link href="/my-booked-session">My Booked Sessions</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                href="/sign-up"
                className={`btn btn-sm ${
                  theme === "dark" ? "btn-ghost text-gray-200" : ""
                }`}
              >
                Register
              </Link>

              <Link
                href="/login"
                className="btn btn-sm bg-[#0675c1] text-white"
              >
                Login
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className={`btn btn-square btn-ghost ${
                theme === "dark" ? "text-gray-200" : ""
              }`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className={`absolute top-16 left-0 w-full shadow-lg lg:hidden z-50 border-t ${
            theme === "dark"
              ? "bg-[#0f1623] border-gray-800"
              : "bg-base-100 border-base-200"
          }`}
        >
          <ul className="menu p-4 gap-2">
            {navLinks}

            {isLoggedIn ? (
              <>
                <li className="menu-title">
                  <span>{user?.name || "Account"}</span>
                </li>
                <li>
                  <Link href="/my-booked-session">My Booked Sessions</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/sign-up">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
