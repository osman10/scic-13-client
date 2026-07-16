"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TravelStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { end: 42, suffix: "", label: "Countries" },
    { end: 1200, suffix: "+", label: "Local hosts" },
    { end: 94, suffix: "k", label: "Travelers hosted" },
    { end: 4.9, suffix: "★", decimals: 1, label: "Average rating" },
  ];

  return (
    <section className="bg-[var(--muted)] py-10">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4"
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-xl bg-white p-5 text-center shadow-lg"
            >
              <h3 className="text-xl  sm:text-3xl font-extrabold text-[var(--primary)] sm:text-4xl">
                {inView && (
                  <CountUp
                    end={item.end}
                    duration={2.5}
                    decimals={item.decimals || 0}
                    separator=","
                    suffix={item.suffix}
                  />
                )}
              </h3>

              <p className="mt-2 text-sm font-medium text-[var(--muted-foreground)] sm:text-base">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStats;