"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Amara Wijaya",
    location: "Bali",
    image: "https://i.pravatar.cc/100?img=32",
    review:
      "Voyagio matched me with a family who taught me to cook lawar from scratch. Best three days of the year.",
  },
  {
    id: 2,
    name: "Kenji Tanaka",
    location: "Kyoto",
    image: "https://i.pravatar.cc/100?img=12",
    review:
      "This is what travel should feel like — small groups, real hosts, no tourist trap in sight.",
  },
  {
    id: 3,
    name: "Sofia Ricci",
    location: "Amalfi",
    image: "https://i.pravatar.cc/100?img=48",
    review:
      "I've now hosted 40 travelers on Voyagio. The platform respects hosts as much as it respects guests.",
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Testimonials = () => {
  return (
    <section className="bg-[#174B4B] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#D87B3A] font-semibold">
            What Travelers Say
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-serif font-bold">
            A quiet, growing chorus.
          </h2>
        </motion.div>


        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                flex
                min-h-[270px]
                flex-col
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-sm
              "
            >

              {/* Stars */}
              <motion.div
                className="flex gap-1 text-[#F07D3B]"
                initial="hidden"
                whileInView="visible"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.3,
                    }}
                  >
                    <FaStar size={14} />
                  </motion.div>
                ))}
              </motion.div>


              {/* Review */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-5 leading-7 text-white/90"
              >
                "{item.review}"
              </motion.p>


              {/* User */}
              <motion.div
                className="mt-auto flex items-center gap-4 pt-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </motion.div>

                <div>
                  <h4 className="font-medium">
                    {item.name}
                  </h4>

                  <p className="text-sm text-white/60">
                    {item.location}
                  </p>
                </div>
              </motion.div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;