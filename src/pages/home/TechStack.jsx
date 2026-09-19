import { motion } from "framer-motion";
import { Tech } from "../../data";

const TechStack = () => {
  return (
    <div className="w-full bg-bg">
      <section className="max-w-7xl mx-auto py-16 px-6 overflow-hidden ">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-semibold font-display text-text">
              Tech Stack & Tools
            </h2>
            <p className="text-sm text-muted  mt-10 font-block">
              The tools I use to build and ship full-stack web apps.
            </p>
          </motion.div>

          {/* Marquee Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            {/* Marquee Track using Framer Motion */}
            <motion.div
              className="flex w-max py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 20,
                repeat: Infinity,
              }}
            >
              {[...Tech, ...Tech, ...Tech, ...Tech].map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className="flex flex-col items-center gap-2 group pr-10 md:pr-14"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl hover:bg-white/90 border border-white/90
                  flex items-center justify-center p-3
                  group-hover:border-white group-hover:shadow-md
                  transition-all duration-200"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  >
                    <img
                      src={tool.path}
                      alt={tool.name}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <span
                    className="text-xs font-medium text-nav
                  group-hover:text-dark-accent transition-colors duration-200"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
