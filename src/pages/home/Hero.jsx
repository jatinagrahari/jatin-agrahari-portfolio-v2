import { motion } from "framer-motion";
import { Button, DockName } from "../../components";
import Navbar from "../../components/layout/Navbar";
import { siteConfig } from "../../data";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="h-screen flex justify-center overflow-x-hidden bg-grid-pattern relative">
        {/* Hero Section */}
        <div className="px-6 pt-24 mx-auto flex flex-col w-full relative z-10 justify-center items-center">
          {/* Giant Monogram Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-full flex justify-center items-start -z-10  pointer-events-none select-none"
          >
            <div
              className="text-[40vw] leading-[0.75] text-black tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.alias}
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
            className="w-full flex flex-col items-center justify-center mb-20 mt-10 relative z-10"
          >
            {/* Name — Mac Dock Magnification */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  filter: "blur(10px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {/* name animation */}
              <DockName owner={siteConfig.owner} />
            </motion.div>

            {/* Hero Description */}
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  filter: "blur(6px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                },
              }}
              className="text-xl mt-20 max-w-3xl text-muted text-center"
            >
              {siteConfig.heroHeading}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: "easeOut",
                  },
                },
              }}
              className="flex gap-10 mt-20"
            >
              <a
                href="mailto:hello@jatinagrahari.com"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type={"primary"}
                  children={"Get in touch"}
                  arrow={"plain"}
                />
              </a>

              <a
                href="https://linkedin.com/in/jatinagrahari"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type={"secondary"}
                  children={"Connect on LinkedIn"}
                  arrow={"other"}
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
