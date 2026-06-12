"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import { toast } from "react-toastify";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import AuthRedirect from "@/components/AuthRedirect";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") || "").trim();
    const password = (formData.get("password") || "").trim();

    if (!email || !password) {
      const message = "Email and password are required";
      setFormError(message);
      toast.error(message);
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser({ email, password });

      login(data.token, data.user);
      toast.success("Login successful");
      router.replace("/");
    } catch (error) {
      const message = error.message || "Login failed";
      setFormError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthRedirect>
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

          {formError && <p className="mb-4 text-sm text-red-500">{formError}</p>}

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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-[#045A94] text-white font-semibold hover:bg-[#044D80] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            className={`text-center mt-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Do not have an account?{" "}
            <Link
              href="/sign-up"
              className={`font-semibold ${
                isDark ? "text-[#67aefb]" : "text-[#045A94]"
              }`}
            >
              Register
            </Link>
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  isDark ? "bg-[#111827] text-gray-400" : "bg-white text-gray-500"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={() => authClient.signIn.social({ provider: "google" })}
            className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.46-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.51 1.06-2.86 0-5.29-1.93-6.16-4.53H2.69v2.84C4.12 21.35 7.69 23 12 23z"/>
              <path fill="#FBBC05" d="M6.16 14.53c-.27-.85-.42-1.74-.42-2.67s.15-1.82.42-2.67V6.26H6.16v2.53H2.69C1.86 9.85 1.5 10.92 1.5 12s.36 2.15 1.19 3.18L6.16 14.53z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.69 1 4.12 2.65 2.69 5.26L6.16 8.43C6.29 6.53 8.71 5.38 12 5.38z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </motion.div>
    </AuthRedirect>
  );
}