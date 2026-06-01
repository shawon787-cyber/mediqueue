"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setPasswordError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const name = String(formData.get("name") || "");
    const image = String(formData.get("image") || "");

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setPasswordError(validationMessage);
      toast.error(validationMessage);
      setLoading(false);
      return;
    }

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: image ? image : undefined,
    });

    setLoading(false);

    if (error) {
      setFormError(error.message || "Signup failed");
      toast.error(error.message || "Signup failed");
      return;
    }

    toast.success("Signup successful");
    router.push("/Login");
  };

  const handleGoogleAuth = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      const message = error.message || "Google sign in failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-sm opacity-70">
              Create your account to continue
            </p>
          </div>

          {/* Errors */}
          {formError && (
            <div className="alert alert-error py-2 text-sm">
              {formError}
            </div>
          )}

          {passwordError && (
            <div className="alert alert-error py-2 text-sm">
              {passwordError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-3">

            <input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="image"
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />

            <input
              name="email"
              placeholder="Email"
              type="email"
              className="input input-bordered w-full"
              required
            />

            <input
              name="password"
              placeholder="Password"
              type="password"
              className="input input-bordered w-full"
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

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="btn btn-outline w-full"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M21.35 11.1h-9.17v2.92h5.26c-.23 1.24-1.45 3.63-5.26 3.63-3.17 0-5.75-2.63-5.75-5.88s2.58-5.88 5.75-5.88c1.8 0 3 .77 3.69 1.44l2.52-2.43C16.47 3.9 14.47 3 12.18 3 6.92 3 2.73 7.18 2.73 12.45c0 5.27 4.19 9.45 9.45 9.45 5.49 0 9.12-3.85 9.12-9.28 0-.62-.07-1.09-.15-1.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Login */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/Login" className="link link-primary">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}