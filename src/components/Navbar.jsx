"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/tutors">Tutors</Link>
      </li>

       {user && (
      <>
        <li>
          <Link href="/add-tutor">Add Tutor</Link>
        </li>

        <li>
          <Link href="/MyTutors">My Tutors</Link>
        </li>

        <li>
          <Link href="/my-booked-session">
            My Booked Sessions
          </Link>
        </li>
      </>
    )}
    </>
  );

  return (
    <div className="w-full bg-base-100 shadow relative">
      <div className="navbar container mx-auto px-4 min-h-[4rem]">
        {/* Logo */}
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

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

{user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img src={user.image} alt={user.name || "User"} />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-lg font-semibold"
                      style={{ backgroundColor: "#0675C1" }}
                    >
                      {(user.email?.[0] || user.name?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-56"
              >
                <li className="menu-title">
                  <span>{user.name}</span>
                </li>

                <li>
                  <Link href="/profile">Profile</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/sign-up" className="btn btn-sm">
                Register
              </Link>

              <Link
                href="/Login"
                className="btn btn-sm bg-[#0675c1] text-white"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-square btn-ghost"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-lg lg:hidden z-50 border-t border-base-200">
          <ul className="menu p-4 gap-2">
            {navLinks}

            {user ? (
              <>
                <li className="menu-title">
                  <span>{user.name}</span>
                </li>

                <li>
                  <Link href="/profile">Profile</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/sign-up">Register</Link>
                </li>

                <li>
                  <Link href="/Login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}