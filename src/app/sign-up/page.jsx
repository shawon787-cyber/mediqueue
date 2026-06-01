"use client";

import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#045A94]">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to get started
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Photo URL
            </label>

            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="url"
                placeholder="Enter photo URL"
                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#045A94] text-white font-semibold hover:bg-[#044D80] transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t"></div>
          <span className="text-sm text-gray-500">
            OR
          </span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#045A94]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}