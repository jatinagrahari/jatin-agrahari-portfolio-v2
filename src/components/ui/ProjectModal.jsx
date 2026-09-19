import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { projectsData } from "../../data/projectInfo";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef(null);
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 350;
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Track scroll progress inside the modal specifically
  const { scrollYProgress } = useScroll({
    container: modalRef,
  });

  // Smooth out the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Intersection Observer for Scroll Spy
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Trigger when the section is near the top of the viewport
      { root: modalRef.current, rootMargin: "-20% 0px -75% 0px" },
    );

    // Give the DOM a tiny bit of time to render the sections before observing
    setTimeout(() => {
      const sections = document.querySelectorAll(".project-section");
      sections.forEach((s) => observer.observe(s));
    }, 100);

    return () => observer.disconnect();
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Lookup rich project data, fallback to pods-over-silos if missing so it doesn't break
  const richProject =
    projectsData.find((p) => p.id === project?.id) || projectsData[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-dark overflow-hidden flex justify-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 z-[60] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={modalRef}
            className="w-full h-full overflow-y-auto rounded-t-2xl md:rounded-t-[40px] relative bg-white scroll-smooth mt-4 md:mt-12 mx-4 md:mx-12 mb-0 shadow-2xl border-t border-l border-r border-border"
          >
            {/* 1. DARK HERO SECTION */}
            <div className="relative w-full min-h-[70vh] md:min-h-[85vh] bg-dark text-white overflow-hidden flex items-center rounded-t-2xl md:rounded-t-[40px]">
              {/* Dark Grid Background */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />

              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.85] tracking-tight uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-light)",
                    }}
                  >
                    {richProject.title.split(":").map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && ":"}
                        <br />
                      </span>
                    ))}
                  </motion.h1>
                </div>
                <div className="w-full md:w-1/2 flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="rounded-xl border border-border shadow-2xl w-full max-w-lg bg-surface aspect-[4/3] flex items-center justify-center overflow-hidden"
                  >
                    {richProject.projectThumbnail ? (
                      <img
                        src={richProject.projectThumbnail}
                        alt={richProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : richProject.heroImage ? (
                      <img
                        src={richProject.heroImage}
                        alt={richProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted font-mono text-sm">
                        Image Mockup
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 2. STICKY HEADER & PROGRESS BAR */}
            <div className="sticky top-0 z-40 w-full bg-white text-black border-b border-gray-200">
              {/* Progress Bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-[#6c42e8] origin-left z-50"
                style={{ scaleX }}
              />
              <div className="py-6 text-center bg-white/90 backdrop-blur-md px-4">
                <h2
                  className="text-lg md:text-2xl uppercase tracking-tighter font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {richProject.title}
                </h2>
              </div>
            </div>

            {/* 3. left LIGHT CONTENT SECTION */}
            <div className="w-full  mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-12 lg:gap-24 text-black relative bg-white">
              {/* Sticky Sidebar Navigation */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-32 flex flex-col gap-6 text-sm font-medium">
                  {[
                    "Overview",
                    "Background",
                    "Approach",
                    "Solution",
                    "Outcomes",
                    "Gallery",
                    "Reflection",
                  ].map((item) => {
                    const id = item.toLowerCase();
                    const isActive = activeSection === id;

                    // Only render link if the section exists in data
                    if (
                      !richProject[id] &&
                      id !== "overview" &&
                      id !== "background" &&
                      id !== "approach" &&
                      id !== "solution" &&
                      id !== "outcomes" &&
                      id !== "gallery" &&
                      id !== "reflection"
                    )
                      return null;
                    // Special case for Gallery: only show if projectImages exists
                    if (
                      id === "gallery" &&
                      (!richProject.projectImages ||
                        richProject.projectImages.length === 0)
                    )
                      return null;

                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`transition-colors duration-300 ${isActive ? "text-black font-bold" : "text-gray-400 hover:text-gray-600"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(id);
                          if (element && modalRef.current) {
                            const headerOffset = 100;
                            const elementPosition = element.offsetTop;
                            modalRef.current.scrollTo({
                              top: elementPosition - headerOffset,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {item}
                      </a>
                    );
                  })}

                  {/* Action Buttons in Sidebar */}
                  <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                    {richProject?.projectPrimaryLink && (
                      <a
                        href={richProject.projectPrimaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-dark text-white text-center rounded-full text-xs uppercase tracking-widest font-bold hover:bg-darker transition-colors"
                      >
                        {richProject.projectPrimaryButton || "View Live"}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/*  right Scrollable Content Area */}
              <div className="flex-1 max-w-5xl">
                <div className="w-full flex flex-col gap-24 pb-32 text-left">
                  {richProject.overview && (
                    <section
                      id="overview"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Overview
                      </h3>
                      <div className="prose prose-lg prose-gray max-w-none w-full text-left">
                        <p
                          className="text-gray-600 leading-relaxed text-sm md:text-md"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {richProject.overview.paragraph}
                        </p>
                        <ul
                          className="mt-8 space-y-4 text-gray-600 text-md"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {richProject.overview.role && (
                            <li>
                              <strong>Role:</strong> {richProject.overview.role}
                            </li>
                          )}
                          {richProject.overview.org && (
                            <li>
                              <strong>Org:</strong> {richProject.overview.org}
                            </li>
                          )}
                          {richProject.overview.catalyst && (
                            <li>
                              <strong>Catalyst:</strong>{" "}
                              {richProject.overview.catalyst}
                            </li>
                          )}
                          {richProject.overview.outcome && (
                            <li>
                              <strong>Outcome:</strong>{" "}
                              {richProject.overview.outcome}
                            </li>
                          )}
                        </ul>
                      </div>
                    </section>
                  )}

                  {richProject.background && (
                    <section
                      id="background"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Background
                      </h3>
                      <div className="prose prose-lg prose-gray max-w-none w-full text-left">
                        {richProject.background.map((item, idx) => (
                          <div key={idx} className={idx > 0 ? "mt-12" : ""}>
                            <h4 className="text-xl font-bold mb-4 font-sans tracking-tight uppercase">
                              {item.title}
                            </h4>
                            <p
                              className="text-gray-600 leading-relaxed text-sm md:text-md"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {richProject.approach && (
                    <section
                      id="approach"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Approach
                      </h3>
                      <div className="prose prose-lg prose-gray max-w-none w-full text-left">
                        <p
                          className="text-gray-600 leading-relaxed text-sm md:text-md"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {richProject.approach}
                        </p>
                      </div>
                    </section>
                  )}

                  {richProject.solution && (
                    <section
                      id="solution"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Solution
                      </h3>
                      <div className="prose prose-lg prose-gray max-w-none w-full text-left">
                        <p
                          className="text-gray-600 leading-relaxed text-sm md:text-md"
                          style={{ fontFamily: "var(--font-serif)" }}
                          dangerouslySetInnerHTML={{
                            __html: richProject.solution.replace(
                              /\*\*(.*?)\*\*/g,
                              "<strong>$1</strong>",
                            ),
                          }}
                        />
                      </div>
                    </section>
                  )}

                  {richProject.outcomes && (
                    <section
                      id="outcomes"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Outcomes
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-gray-200 my-12">
                        {richProject.outcomes.map((item, idx) => (
                          <div key={idx}>
                            <h4 className="text-6xl font-bold mb-4 font-sans tracking-tight">
                              {item.metric}
                            </h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold leading-relaxed">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {richProject.projectImages &&
                    richProject.projectImages.length > 0 && (
                      <section
                        id="gallery"
                        className="project-section scroll-mt-32 w-full"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <h3
                            className="text-3xl md:text-5xl tracking-tight font-bold uppercase mb-0"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            Gallery
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => scrollGallery("left")}
                              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => scrollGallery("right")}
                              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div
                          ref={galleryRef}
                          className="w-full overflow-x-auto pb-8 snap-x snap-mandatory flex gap-6"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {/* Hide scrollbar with inline styles for cross-browser, tailwind also has ways but this is foolproof */}
                          <style>{`#gallery div::-webkit-scrollbar { display: none; }`}</style>
                          <div className="flex gap-6 w-max">
                            {richProject.projectImages.map((img) => (
                              <div
                                key={img.id}
                                className="w-[280px] md:w-[320px] flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 flex items-center justify-center"
                              >
                                <img
                                  src={img.source}
                                  alt={`${richProject.title} screenshot ${img.id}`}
                                  className="w-full h-auto object-cover rounded-2xl"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                  {richProject.reflection && (
                    <section
                      id="reflection"
                      className="project-section scroll-mt-32 w-full"
                    >
                      <h3
                        className="text-3xl md:text-5xl mb-8 tracking-tight font-bold uppercase"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Reflection
                      </h3>
                      <div className="prose prose-lg prose-gray max-w-none w-full text-left">
                        {richProject.reflection.map((item, idx) => (
                          <p
                            key={idx}
                            className={`text-gray-600 leading-relaxed text-sm md:text-md ${idx > 0 ? "mt-6" : ""}`}
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            <strong>{item.title}</strong> {item.text}
                          </p>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
