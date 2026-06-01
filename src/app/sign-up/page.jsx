"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
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

  const handleGoogleAuth = () => {
    window.location.href = "/api/auth/sign-in/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Register</h1>
          <p className="mt-2 text-sm text-slate-500">Create your account to continue.</p>
        </div>

        {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
        {passwordError ? <p className="text-sm text-red-600">{passwordError}</p> : null}

        <Input name="name" label="Name" required />
        <Input name="image" label="Photo URL" />
        <Input name="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />

        <Button type="submit" className="w-full bg-amber-300" isDisabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full rounded-lg border border-slate-300 py-3 text-slate-700 hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account? <a href="/Login" className="font-semibold text-slate-900">Login</a>
        </p>
      </form>
    </div>
  );
}