import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F2E8] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">

        {/* 404 */}
        <div className="relative">
          <h1 className="text-[140px] md:text-[180px] font-black leading-none text-[#174B4B] opacity-10">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl md:text-7xl font-bold text-[#174B4B]">
              404
            </h2>
          </div>
        </div>

        {/* Content */}
        <h3 className="mt-8 text-3xl font-serif font-bold text-[#173F43]">
          Lost your way?
        </h3>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Looks like this page went on an adventure and couldn't be found.
          Let's get you back to exploring.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#174B4B] px-8 py-3 font-semibold text-white transition hover:bg-[#123d3d] hover:shadow-lg"
          >
            Back Home
          </Link>

          <Link
            href="/explore"
            className="rounded-full border border-[#174B4B] px-8 py-3 font-semibold text-[#174B4B] transition hover:bg-[#174B4B] hover:text-white"
          >
            Explore Places
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-12 flex justify-center">
          <div className="h-2 w-32 rounded-full bg-gradient-to-r from-[#174B4B] via-[#3B7A7A] to-[#174B4B]" />
        </div>

      </div>
    </main>
  );
}