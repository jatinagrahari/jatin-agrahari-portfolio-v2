// Work.jsx
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FeatureCard from "../../components/ui/FeatureCard";
import ProjectModal from "../../components/ui/ProjectModal";
// import { ProjectCards } from "../../data/projectData";
import { projectsData } from "../../data/projectInfo";

const NAV_OFFSET = 80; // where the first card sticks (clear of navbar)
const PEEK = 14; // px of each earlier card left visible above the next
const SETTLE = 0.2; // fraction of this card's scroll window used to settle

const StackedCard = ({ project, index, total, containerRef, onClick }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const end = (index + 1) / total;
  const settleEnd = Math.min(end + SETTLE, 1);

  const scale = useTransform(
    scrollYProgress,
    [end, settleEnd],
    [1, isLast ? 1 : 0.95],
  );
  const opacity = useTransform(
    scrollYProgress,
    [end, settleEnd],
    [1, isLast ? 1 : 0.7],
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `${NAV_OFFSET + index * PEEK}px`,
        zIndex: index + 1,
        scale,
        opacity,
      }}
    >
      <FeatureCard project={project} index={index} onClick={onClick} />
    </motion.div>
  );
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-dark pt-24 pb-32"
    >
      <div className="mx-auto mb-20 max-w-7xl px-6">
        <h2
          className="text-center text-4xl uppercase tracking-wide text-white md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Select Work
        </h2>
        <p className="text-center pt-10 text-light ">
          A few case studies in design leadership and the products I've built.
          The problems, the bets, and what shipped.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 ">
        {projectsData.map((project, index) => (
          <StackedCard
            key={project.id ?? index}
            project={project}
            index={index}
            total={projectsData.length}
            containerRef={sectionRef}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Work;
