import { motion } from "framer-motion";

const TimelineItem = ({ year, title, description, tech }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="
        relative
        pb-24
        pl-12
        border-l
        border-[#292A2C]
      "
    >
      {/* Timeline dot */}
      <span
        className="
        absolute
        -left-1.25
        top-1
        w-2
        h-2
        rounded-full
        bg-[#C96A3D]
      "
      />

      {/* Year */}
      <p
        className="
        font-mono
        text-sm
        text-[#C96A3D]
        tracking-widest
        mb-3
      "
      >
        {year}
      </p>

      {/* Title */}
      <h3
        className="
        text-2xl
        md:text-3xl
        font-bold
        uppercase
        tracking-tight
        text-[#F1EDE4]
      "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
        mt-4
        text-sm
        md:text-base
        text-[#9B958B]
        leading-relaxed
        max-w-sm
      "
      >
        {description}
      </p>

      {/* Technology */}
      <p
        className="
        mt-5
        font-mono
        text-[11px]
        tracking-widest
        uppercase
        text-[#6F6B64]
      "
      >
        {tech}
      </p>
    </motion.div>
  );
};

export default TimelineItem;
