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
    <section>
      <div className="h-screen flex justify-center overflow-x-hidden bg-grid-pattern">
        {/* Hero Section */}
        <motion.div
          className="absolute left-0 top-0 h-0.5 bg-accent"
          style={{
            width: `${Math.min(count, 100)}%`,
            backgroundColor: "var(--color-accent)",
          }}
          transition={{ ease: "easeOut" }}
        />

        <div className="px-6 pt-16 pb-24 mx-auto flex flex-col w-full relative z-10 justify-center items-center">
          {/* Giant Monogram Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 0.5, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-full flex justify-center items-start -z-10  pointer-events-none select-none"
          >
            <div
              className="text-[40vw] leading-[0.75] text-muted tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.alias}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoadingScreen;
