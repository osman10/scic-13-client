"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { FiPlayCircle } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Banner = () => {
  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden bg-[url('/images/mountain.jpg')] bg-cover bg-center">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/travel-hero.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container mx-auto flex min-h-[80vh] items-center px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl text-white"
        >
          {/* Badge */}
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur-md"
          >
            <BsStars />
            New: Winter 2026 collection
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-6 text-center text-4xl font-extrabold leading-tight sm:text-5xl md:text-left lg:text-7xl"
          >
            Travel that{" "}
            <span className="text-[var(--accent)] underline decoration-[var(--accent)]">
              stays with you.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-200 sm:text-xl md:text-left"
          >
            Small-group experiences hosted by locals — from Kyoto tea
            masters to Patagonian glacier guides. No crowds, no scripts.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/experiences"
                className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 font-semibold text-white shadow-lg"
              >
                Browse experiences
                <LuArrowRight />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/how-it-works"
                className="flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                <FiPlayCircle />
                How it works
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;