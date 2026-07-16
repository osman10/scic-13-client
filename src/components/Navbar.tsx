"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { FaCompass } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const loginMenuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Host", href: "/host" },
  { label: "My Listing", href: "/my-listing" },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/70 shadow-sm backdrop-blur-md"
          : "bg-white/80"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-1 sm:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaCompass className="text-xl text-orange-500" />
          <span className="font-libertinus text-2xl font-bold text-stone-900">
            Traveller
          </span>
        </Link>



        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-5 xl:gap-7">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition hover:text-[var(--accent)] ${
                    pathname === item.href
                      ? "text-[var(--accent)]"
                      : "text-stone-800"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {session &&
              loginMenuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition hover:text-[var(--accent)] ${
                      pathname === item.href
                        ? "text-[var(--accent)]"
                        : "text-stone-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>

          {session ? (
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image || "/avatar.png"}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="rounded-full border"
              />

              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="rounded-full bg-[var(--primary)] px-5 py-2 font-medium text-white transition hover:opacity-90"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="rounded-full border border-stone-700 px-5 py-2 font-medium text-stone-700 transition hover:bg-stone-700 hover:text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>



        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-3xl text-stone-800 lg:hidden"
        >
          {isMenuOpen ? <IoMdClose /> : <CgMenuRight />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full bg-black/90 backdrop-blur-lg transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-3 opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            {[...menuItems, ...(session ? loginMenuItems : [])].map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 text-center transition hover:bg-white/10 ${
                    pathname === item.href
                      ? "text-[var(--accent)]"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {session ? (
              <li className="flex flex-col items-center gap-4 px-6 py-6">
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name || "User"}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-white"
                />

                <p className="text-white">{session.user.name}</p>

                <LogoutButton />
              </li>
            ) : (
              <li className="flex gap-4 p-6">
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-lg bg-green-600 py-3 text-center font-semibold text-white"
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-lg border border-white py-3 text-center font-semibold text-white"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;