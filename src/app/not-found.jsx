import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="text-center max-w-xl">

        <div className="text-9xl mb-4 animate-pulse">
          🧑‍⚕️🔍
        </div>

        <h1 className="text-7xl font-black text-primary">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Patient Record Not Found
        </h2>

        <p className="mt-4 text-base-content/70">
          The page you are looking for doesn't exist or may
          have been moved.
        </p>

        <div className="mt-8">
          <Link href="/" className="btn btn-primary">
            🏥 Return to MediQuee
          </Link>
        </div>
      </div>
    </div>
  );
}