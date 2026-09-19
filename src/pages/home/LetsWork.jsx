import { motion } from "framer-motion";
import { useState } from "react";

const LetsWork = () => {
  const [stars] = useState(() => {
    return Array.from({ length: 100 }).map(() => ({
      id: Math.random(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5 + "px",
      opacity: Math.random() * 0.7 + 0.1,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
  });

  return (
    <section className="relative w-full min-h-[80vh] bg-darker flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* --- PREMIUM SPACE BACKGROUND --- */}
      {/* Deep Space Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-darker to-darker opacity-80" />

      {/* Animated Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-text"
            animate={{
              opacity: [star.opacity, star.opacity * 0.2, star.opacity],
            }}
            transition={{
              duration: parseFloat(star.animationDuration),
              delay: parseFloat(star.animationDelay),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      {/* Glowing Earth Horizon (Atmosphere) */}
      <motion.div
        animate={{
          boxShadow: [
            "0 -40px 150px rgba(50, 100, 200, 0.07), inset 0 20px 50px rgba(100, 150, 255, 0.03)",
            "0 -60px 200px rgba(50, 120, 255, 0.12), inset 0 30px 70px rgba(100, 150, 255, 0.06)",
            "0 -40px 150px rgba(50, 100, 200, 0.07), inset 0 20px 50px rgba(100, 150, 255, 0.03)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none rounded-full border-t border-border"
        style={{
          width: "200vw",
          height: "200vw",
          bottom: "-185vw",
          background:
            "radial-gradient(circle at top, var(--color-surface) 0%, var(--color-darker) 50%)",
        }}
      />
      {/* ------------------------- */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="max-w-3xl flex flex-col items-center relative z-10 pt-16 pb-32"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="text-6xl md:text-8xl mb-8 leading-none uppercase tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-light)",
          }}
        >
          Let's Work Together
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-12 leading-relaxed"
        >
          Open to backend and full-stack roles, remote or in India. If you're
          hiring or have a role in mind, send me a message.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a
            href="mailto:hello@jatinagrahari.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-light text-darker font-semibold text-sm transition-colors hover:bg-white shadow-md"
          >
            Get in touch
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/jatinagrahari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-surface/80 backdrop-blur-sm border border-border text-text font-medium text-sm flex items-center gap-2 hover:bg-border transition-colors"
          >
            Connect on LinkedIn
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LetsWork;
