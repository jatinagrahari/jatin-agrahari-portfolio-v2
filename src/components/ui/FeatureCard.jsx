// FeatureCard.jsx
import { motion } from "framer-motion";

const FeatureCard = ({ project, index, onClick }) => {
  const imageOnLeft = index % 2 !== 0; // even index = image right, odd = image left

  return (
    <div className="pb-24 pt-4 px-2 md:pb-32 cursor-pointer" onClick={onClick}>
      <div
        className={`flex flex-col md:gap-12 lg:gap-20 md:items-center bg-dark border border-border rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl transition-all duration-500 hover:border-muted hover:shadow-[0_0_30px_rgba(255,255,255,0.07)] ${
          imageOnLeft ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Text Section - takes up ~45% */}
        <div className="flex flex-col justify-center md:w-[45%]">
          <h3
            className="mb-4 text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-[3.5rem]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-light)", // muted rose tint from the reference heading
            }}
          >
            {project.projectTitle}
          </h3>
          <p className="max-w-md text-base text-muted md:text-lg">
            {project.projectDescription}
          </p>
        </div>

        {/* Image Section - takes up ~55% and dictates the card height */}
        <motion.div
          whileHover={{ y: -5 }}
          className="overflow-hidden rounded-2xl bg-surface md:w-[55%] mt-8 md:mt-0 aspect-[4/3] lg:aspect-[16/10]"
        >
          <img
            src={project.projectThumbnail}
            alt={project.projectTitle}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureCard;
