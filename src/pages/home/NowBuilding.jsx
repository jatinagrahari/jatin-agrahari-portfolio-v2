import { motion } from "framer-motion";
import { upcomingProjectData } from "../../data/projectInfo";

const NowBuilding = () => {
  return (
    <section className="w-full bg-dark py-16 md:py-20 flex flex-col items-center justify-center text-center px-6 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl flex flex-col items-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted mb-4 font-semibold">
          Now Building
        </p>

        <h2
          className="text-6xl md:text-8xl text-text mb-6 leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {upcomingProjectData.title}
        </h2>

        <p className="text-md md:text-lg text-muted max-w-2xl mb-8 leading-relaxed">
          {upcomingProjectData.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full font-mono bg-surface text-light font-medium text-sm flex items-center gap-2 hover:bg-border transition-colors"
        >
          In Progress . . .
        </motion.button>
      </motion.div>
    </section>
  );
};

export default NowBuilding;
