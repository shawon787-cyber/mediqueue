"use client";

import Link from "next/link";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#045A94]">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>

        <form className="space-y-5">
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
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#045A94] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#045A94] text-white font-semibold hover:bg-[#044D80] transition"
          >
            Login
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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#045A94]"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}