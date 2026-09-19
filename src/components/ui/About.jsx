import { motion } from "framer-motion";
import { TimelineItem } from "../../components";
import { profile } from "../../assets";
import { engineeringJourney } from "../../data/projectInfo";

const About = () => {
  return (
    <>
      <section className="relative bg-dark text-text py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* left side content */}

            <div className="lg:sticky lg:top-24 lg:h-fit">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
              >
                {/* Small label */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-8"
                >
                  01 / About
                </motion.p>

                {/* Main heading */}
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-[-0.04em] max-w-xl"
                >
                  Building
                  <br />
                  systems,
                  <br />
                  <span className="text-text">not just</span>
                  <br />
                  interfaces.
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: "easeOut" },
                    },
                  }}
                  className="mt-10 font-mono text-sm md:text-md text-muted leading-relaxed max-w-md"
                >
                  I'm a software developer with 2.5 years of professional
                  experience. I started on the frontend and I'm now moving into
                  backend engineering. I learn by building, and I'm strongest at
                  taking a feature from idea to working software. My goal is to
                  join a team that ships real products as a backend engineer,
                  and grow into designing systems that stay reliable as they
                  grow.
                </motion.p>

                {/* Small metadata */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: "easeOut" },
                    },
                  }}
                  className="mt-12 space-y-3 font-mono text-[10px] tracking-widest text-muted uppercase"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span>CORE STACK</span>
                  </div>

                  <div>JAVASCRIPT · REACT · NODE.JS </div>

                  <div>EXPRESS · MONGODB · REST APIs</div>
                </motion.div>
              </motion.div>
            </div>

            {/* right photo timeline */}

            <div className="relative">
              {/* Profile image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative w-full max-w-105 aspect-4/5 mx-auto overflow-visible">
                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden bg-dark border border-border rounded-2xl group">
                    <img
                      src={profile}
                      alt="JJ"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-darker/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Rotating circular text */}
                  <div className="absolute -bottom-10 -left-10 w-36 h-36 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-36 h-36 animate-[spin_12s_linear_infinite]"
                    >
                      <defs>
                        <path
                          id="textCircle"
                          d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                        />
                      </defs>

                      <text
                        fill="#ff5a36"
                        fontSize="10"
                        fontFamily="monospace"
                        letterSpacing="1.5"
                      >
                        <textPath href="#textCircle">
                          full stack developer • backend APIs •
                        </textPath>
                      </text>
                    </svg>

                    {/* Center dot */}
                    <span className="absolute w-2 h-2 bg-accent rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Engineering Journey */}
              <div className="mt-32 max-w-125 mx-auto">
                <p className="font-mono text-[14px] tracking-[0.25em] text-muted uppercase mb-16">
                  Engineering Journey
                </p>

                {/* 2026 */}
                {engineeringJourney.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                  >
                    <TimelineItem
                      year={item.year}
                      title={item.title}
                      description={item.description}
                      tech={item.tech}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
