import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LetsWork from "../home/LetsWork";
import Navbar from "../../components/layout/Navbar";
import aboutBg from "../../assets/about-bg.png";
import { aboutData } from "../../data/index";

const TimelineItem = ({ index, year, title, text }) => {
  const imageOnLeft = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-5xl mx-auto flex items-center justify-center py-24 md:py-32"
    >
      {/* The Year Badge (Centered) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-dark px-4 py-2"
      >
        <span
          className="text-4xl md:text-5xl text-accent"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {year}
        </span>
      </motion.div>

      <div
        className={`w-full flex flex-col md:flex-row items-center gap-12 md:gap-0 ${imageOnLeft ? "" : "md:flex-row-reverse"}`}
      >
        {/* Image Side */}
        <div
          className={`w-full md:w-1/2 flex justify-center ${imageOnLeft ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}
        >
          {/* <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-sm aspect-[4/3] bg-surface rounded-2xl overflow-hidden border border-border shadow-2xl"
          >
            
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-muted font-mono text-sm">
              Photo Placeholder
            </div>
          </motion.div> */}
        </div>

        {/* Text Side */}
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center ${imageOnLeft ? "md:pl-16 lg:pl-24 text-left" : "md:pr-16 lg:pr-24 md:text-right text-left"}`}
        >
          <p className="text-light text-xs font-mono tracking-widest uppercase mb-4">
            {year}
          </p>
          <h3
            className="text-3xl md:text-4xl text-text mb-6 leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="w-full bg-dark min-h-screen relative">
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      {/* 1. Hero Section */}
      <section
        ref={containerRef}
        className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Split background placeholder */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 flex w-full h-[120%] -top-[10%]"
        >
          <div className="w-full h-full bg-surface border-r border-border overflow-hidden relative">
            <img
              src={aboutBg}
              alt="about background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-[25vw] md:text-[20vw] text-text uppercase leading-none tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About
        </motion.h1>
      </section>

      {/* 2. Philosophy Section */}
      <section className="w-full py-24 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl text-text mb-8 leading-tight font-serif">
            {aboutData.aboutTitle}
          </h2>
          <p className="text-muted text-lg leading-relaxed max-w-3xl mx-auto">
            {aboutData.aboutIntro}
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutData.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-surface border border-border hover:border-border transition-colors"
            >
              <div className="w-12 h-12 mb-8 border border-border rounded grid grid-cols-2 grid-rows-2 p-2 gap-1">
                <div className="bg-white/10"></div>
                <div className="bg-white/10"></div>
                <div className="bg-white/10"></div>
                <div className="bg-white/10"></div>
              </div>
              <h3 className="text-xl text-light mb-4 font-semibold">
                {card.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. My Story Timeline */}
      <section className="w-full py-32 px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-32 relative z-10 bg-dark py-8"
        >
          <h2
            className="text-6xl md:text-8xl text-light mb-8 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Story
          </h2>
          <p className="text-xl text-muted leading-relaxed">
            {aboutData.journeyTitle}
          </p>
        </motion.div>

        {/* The Timeline Container */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* The Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"
          ></motion.div>
          {aboutData.timelineData.map((item, index) => (
            <TimelineItem
              index={index}
              year={item.year}
              // location="MILWAUKEE, WISCONSIN"
              title={item.title}
              text={item.description}
              imageOnLeft={false}
            />
          ))}
        </div>
      </section>

      {/* 4. Let's Work Together (Reused) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="absolute left-1/2 top-0 h-24 w-[1px] bg-white/10 -translate-x-1/2"></div>

        <div className="pt-32">
          <LetsWork />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
