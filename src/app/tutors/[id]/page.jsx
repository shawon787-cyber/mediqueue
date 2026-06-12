import Link from "next/link";
import ThemeDetailsClient from "./ThemeDetailsClient";
import { fetchTutorById } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await fetchTutorById(id);

  if (!data?.success) {
    return {
      title: "Tutor Details",
    };
  }

  return {
    title: data.data?.tutorName || "Tutor Details",
  };
}

export default async function TutorDetailsPage({ params }) {
  const { id } = await params;

  const data = await fetchTutorById(id);

  if (!data?.success) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-2xl font-bold">
          Failed to load tutor
        </h2>

        <Link href="/tutors" className="text-blue-600 underline mt-4 block">
          Go back
        </Link>
      </div>
    );
  }

  const tutor = data.data;

  return <ThemeDetailsClient tutor={tutor} />;
}