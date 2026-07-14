import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">
        Unauthorized
      </h1>

      <p className="mb-6 text-gray-600">
        You need to be logged in to access this page.
      </p>

      <Link
        href="/"
        className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}