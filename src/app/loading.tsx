export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F7F2E8] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">

        {/* Logo / Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-[#174B4B]/20 border-t-[#174B4B] animate-spin" />

          <div className="absolute text-2xl">
            🌍
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-[#174B4B]">
            Exploring the world...
          </h2>

          <p className="mt-2 text-gray-500">
            Preparing your next adventure
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#174B4B] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-3 w-3 rounded-full bg-[#174B4B] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-3 w-3 rounded-full bg-[#174B4B] animate-bounce" />
        </div>

      </div>
    </main>
  );
}