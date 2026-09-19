import { motion } from "framer-motion";
import { siteConfig } from "../../data";
import { useEffect, useState } from "react";

const LoadingScreen = ({ isLoading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 5;
      });
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  useEffect(() => {
    const time = setTimeout(() => {
      isLoading(false);
    }, 1500);

    return () => {
      clearTimeout(time);
    };
  }, [isLoading]);

  return (
    <section className="fixed inset-0 z-[9999] overflow-hidden bg-grid-pattern">
      {/* Loading Progress */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-accent"
        style={{
          width: `${Math.min(count, 100)}%`,
          backgroundColor: "var(--color-accent)",
        }}
      />

      {/* Centered JJ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 0.5,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center justify-center pointer-events-none select-none"
        >
          <div
            className="text-[55vw] sm:text-[45vw] md:text-[35vw] lg:text-[30vw] leading-[0.75] text-muted tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteConfig.alias}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoadingScreen;
