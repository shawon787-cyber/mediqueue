"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="max-w-2xl text-center">

        {/* Cartoon Emoji */}
        <div className="text-8xl mb-6 animate-bounce">
          🩺😵‍💫
        </div>

        {/* Logo Style */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaHeartbeat className="text-primary text-3xl" />
          <h1 className="text-4xl font-extrabold">
            MediQuee
          </h1>
        </div>

        <div className="badge badge-error badge-lg mb-5">
          System Error
        </div>

        <h2 className="text-5xl font-black mb-4">
          Oops! Something went wrong
        </h2>

        <p className="text-base-content/70 text-lg mb-8">
          Our virtual doctor is checking the issue. Please try
          again or return to the homepage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn btn-primary"
          >
            <MdRefresh size={20} />
            Try Again
          </button>

          <Link href="/" className="btn btn-outline">
            🏠 Back Home
          </Link>
        </div>

        <div className="mt-12">
          <div className="loading loading-dots loading-lg text-primary"></div>
        </div>

        <p className="mt-6 text-sm text-base-content/50">
          Error Code: MEDIQUEE-500
        </p>
      </div>
    </div>
  );
}