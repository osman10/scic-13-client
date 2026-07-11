import { FiMail, FiMessageCircle, FiMapPin } from "react-icons/fi";

const ContactSection = () => {
  return (
    <section className="bg-[#F6F2E8] py-24">
      <div className="container mx-auto px-6 mt-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left */}
          <div>


            <h2 className="mb-6 text-5xl font-bold text-[#12232D]">
              Say hello.
            </h2>

            <p className="max-w-md text-lg leading-8 text-gray-600">
              We reply within an hour between 7am and 11pm local time,
              seven days a week.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <FiMail className="text-xl text-orange-500" />
                <span className="text-lg text-[#12232D]">
                  hello@voyagio.travel
                </span>
              </div>

              <div className="flex items-center gap-4">
                <FiMessageCircle className="text-xl text-orange-500" />
                <span className="text-lg text-[#12232D]">
                  Live chat via the widget below
                </span>
              </div>

              <div className="flex items-center gap-4">
                <FiMapPin className="text-xl text-orange-500" />
                <span className="text-lg text-[#12232D]">
                  Lisbon · Kyoto · Buenos Aires
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-[#DDDCCF] bg-white p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block font-medium text-[#12232D]">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#DDDCCF] bg-[#FDFBF5] px-4 py-3 outline-none transition focus:border-teal-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#12232D]">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-[#DDDCCF] bg-[#FDFBF5] px-4 py-3 outline-none transition focus:border-teal-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#12232D]">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-[#DDDCCF] bg-[#FDFBF5] px-4 py-3 outline-none transition focus:border-teal-700"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1F5A5A] py-4 font-semibold text-white transition hover:bg-[#184848]"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;