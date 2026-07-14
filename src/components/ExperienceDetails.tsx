import BookNowButton from "./BookNowButton";

type Experience = {
  _id: string;
  country: string;
  catagory: string;
  image: string;
  rating: number;
  title: string;
  subTitle: string;
  experience: string;
  price: number;
};

type ExperienceDetailsProps = {
  experience: Experience;
};

export default function ExperienceDetails({
  experience,
}: ExperienceDetailsProps) {
  return (
    <section className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="h-full w-full object-cover"
        />

        {/* Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto -mt-40 max-w-7xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[2fr_360px]">
          {/* Left Card */}
          <div className="rounded-2xl border bg-white p-8 shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                {experience.catagory}
              </span>

              <span>{experience.country}</span>

              <span className="flex items-center gap-1">
                ⭐ {experience.rating}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              {experience.title}
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              {experience.subTitle}
            </p>

            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">
                About this experience
              </h2>

              <p className="leading-8 text-gray-600">
                {experience.experience}
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border p-5">
                <p className="text-2xl">👥</p>
                <h3 className="mt-2 font-semibold">Small group</h3>
                <p className="text-sm text-gray-500">
                  Max 8 travelers
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <p className="text-2xl">🛡️</p>
                <h3 className="mt-2 font-semibold">
                  Trip protection
                </h3>
                <p className="text-sm text-gray-500">
                  Included with every booking
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <p className="text-2xl">📅</p>
                <h3 className="mt-2 font-semibold">
                  Flexible dates
                </h3>
                <p className="text-sm text-gray-500">
                  Cancel up to 7 days before
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-12">
              <h2 className="mb-5 text-2xl font-semibold">
                Reviews
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-5">
                  <p className="text-orange-500">★★★★★</p>

                  <p className="mt-2 text-gray-600">
                    "Absolutely magical. The scenery and
                    experience exceeded every expectation."
                  </p>

                  <p className="mt-4 text-sm text-gray-400">
                    — Maria L.
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-orange-500">★★★★★</p>

                  <p className="mt-2 text-gray-600">
                    "One of the best travel experiences I've
                    ever booked."
                  </p>

                  <p className="mt-4 text-sm text-gray-400">
                    — Daniel R.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="h-fit rounded-2xl border bg-white p-6 shadow-xl lg:sticky lg:top-8">
            <p className="text-sm text-gray-500">from</p>

            <h2 className="text-4xl font-bold">
              ${experience.price}
            </h2>

            <p className="text-sm text-gray-500">
              per person
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Travel date
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Party size
                </label>

                <input
                  type="number"
                  defaultValue={2}
                  min={1}
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

                <BookNowButton/>

              <p className="text-center text-xs text-gray-400">
                Free cancellation up to 7 days before travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}