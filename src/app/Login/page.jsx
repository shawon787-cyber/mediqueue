"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useTheme } from "@/components/ThemeContext";

export default function LoginPage() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const { isDark } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      const message = error.message || "Login failed";
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Login successful");
    router.push("/");
  };

  const handleGoogleAuth = async () => {
    const { error } = await authClient.signIn.social({ provider: "google" });
    if (error) {
      const message = error.message || error.code || "Google sign in failed";
      setFormError(message);
      toast.error(message);
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? "bg-[#0b0f1a]" : "bg-slate-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-lg p-8 ${
          isDark ? "bg-[#111827] text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-[#67aefb]" : "text-[#045A94]"
            }`}
          >
            Login
          </h1>
          <p
            className={`mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Sign in to your account.
          </p>
        </div>

        {formError && (
          <p className="mb-4 text-sm text-red-500">{formError}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              className={`block mb-2 font-medium ${
                isDark ? "text-gray-300" : ""
              }`}
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94] ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`block mb-2 font-medium ${
                isDark ? "text-gray-300" : ""
              }`}
            >
              Password
            </label>
            <div className="relative">
              <FaLock
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#045A94] ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className={`text-sm ${
                isDark
                  ? "text-[#67aefb] hover:underline"
                  : "text-[#045A94] hover:underline"
              }`}
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
          <div
            className={`flex-1 border-t ${
              isDark ? "border-gray-700" : ""
            }`}
          />
          <span
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            OR
          </span>
          <div
            className={`flex-1 border-t ${
              isDark ? "border-gray-700" : ""
            }`}
          />
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className={`w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1a2235] transition ${
            isDark ? "border-gray-700" : ""
          }`}
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p
          className={`text-center mt-6 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Do not have an account?{" "}
          <Link
            href="/sign-up"
            className={`font-semibold ${
              isDark
                ? "text-[#67aefb]"
                : "text-[#045A94]"
            }`}
          >
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
