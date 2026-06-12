"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { registerUser } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import AuthRedirect from "@/components/AuthRedirect";
import { authClient } from "@/lib/auth-client";

const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";
  return "";
};

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isDark } = useTheme();

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setPasswordError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const image = String(formData.get("image") || "").trim();

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setPasswordError(validationMessage);
      toast.error(validationMessage);
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser({
        email,
        password,
        name,
        image: image || undefined,
      });

      login(data.token, data.user);
      toast.success("Account created successfully");
      router.replace("/");
    } catch (error) {
      const message = error.message || "Signup failed";
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRedirect>
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          isDark ? "bg-[#0b0f1a]" : "bg-base-200"
        }`}
      >
        <div
          className={`card w-full max-w-md shadow-xl ${
            isDark ? "bg-[#111827] text-gray-200" : "bg-base-100"
          }`}
        >
          <div className="card-body">
            <div className="text-center mb-4">
              <h1
                className={`text-3xl font-bold ${
                  isDark ? "text-[#67aefb]" : ""
                }`}
              >
                Register
              </h1>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "opacity-70"
                }`}
              >
                Create your account to continue
              </p>
            </div>

            {formError && (
              <div className="alert alert-error py-2 text-sm">{formError}</div>
            )}

            {passwordError && (
              <div className="alert alert-error py-2 text-sm">
                {passwordError}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Name"
                className={`input input-bordered w-full ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
                required
              />

              <input
                name="image"
                placeholder="Photo URL"
                className={`input input-bordered w-full ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
              />

              <input
                name="email"
                placeholder="Email"
                type="email"
                className={`input input-bordered w-full ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
                required
              />

              <input
                name="password"
                placeholder="Password"
                type="password"
                className={`input input-bordered w-full ${
                  isDark
                    ? "bg-[#1a2235] border-gray-700 text-white placeholder-gray-500"
                    : ""
                }`}
                required
              />

              <button
                type="submit"
                className={`btn bg-[#045A94] text-white w-full shadow-lg ${
                  loading ? "loading" : ""
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
</form>

             <p className="text-center text-sm mt-4">
               Already have an account?{" "}
               <a href="/login" className="link link-primary">
                 Login
               </a>
             </p>

             <div className="relative my-6">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-300"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                 <span
                   className={`px-2 ${
                     isDark ? "bg-[#111827] text-gray-400" : "bg-base-100 text-gray-500"
                   }`}
                 >
                   Or continue with
                 </span>
               </div>
             </div>

             <button
               onClick={() => authClient.signIn.social({ provider: "google" })}
               className="btn btn-outline w-full flex items-center justify-center gap-2"
             >
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.46-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.51 1.06-2.86 0-5.29-1.93-6.16-4.53H2.69v2.84C4.12 21.35 7.69 23 12 23z"/>
                 <path fill="#FBBC05" d="M6.16 14.53c-.27-.85-.42-1.74-.42-2.67s.15-1.82.42-2.67V6.26H6.16v2.53H2.69C1.86 9.85 1.5 10.92 1.5 12s.36 2.15 1.19 3.18L6.16 14.53z"/>
                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.69 1 4.12 2.65 2.69 5.26L6.16 8.43C6.29 6.53 8.71 5.38 12 5.38z"/>
               </svg>
               Sign up with Google
             </button>
           </div>
         </div>
       </div>
     </AuthRedirect>
   );
}
