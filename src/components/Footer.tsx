import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaEnvelope,
  FaCompass,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-stone-300 bg-[#F6F2E8] text-stone-700">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-libertinus mb-4 flex items-center gap-2 text-3xl text-[var(--accent)] font-bold text-stone-900"
            >
              <FaCompass className="text-lg text-orange-500" />
              Traveller
            </Link>

            <p className="max-w-xs leading-7 text-stone-600">
              Handpicked, small-group travel experiences hosted by locals who
              love where they live.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-stone-900">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/experiences" className="hover:text-stone-900">
                  All experiences
                </Link>
              </li>
              <li>
                <Link href="/cultural" className="hover:text-stone-900">
                  Cultural
                </Link>
              </li>
              <li>
                <Link href="/adventure" className="hover:text-stone-900">
                  Adventure
                </Link>
              </li>
              <li>
                <Link href="/food-wine" className="hover:text-stone-900">
                  Food &amp; Wine
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-stone-900">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-stone-900">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-stone-900">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-stone-900">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-stone-900">
              Reach us
            </h3>

            <a
              href="mailto:hello@voyagio.travel"
              className="mb-4 flex items-center gap-2 hover:text-stone-900"
            >
              <FaEnvelope className="text-sm" />
              hello@voyagio.travel
            </a>

            <p className="mb-6 text-stone-600">
              Lisbon · Tokyo · Mexico City
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 transition hover:bg-stone-200"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 transition hover:bg-stone-200"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 transition hover:bg-stone-200"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-300 pt-6 text-sm text-stone-500 md:flex-row">
          <p>© 2026 Traveller. All rights reserved.</p>

          <p>Made with care in Lisbon.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;