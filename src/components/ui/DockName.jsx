import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DockName = ({ owner }) => {
  const mouseX = useMotionValue(-1000);

  return (
    <h1
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
      className="text-[12vw] xl:text-[13rem] leading-[0.8] text-text/90 tracking-tighter whitespace-nowrap flex items-end"
    >
      {owner.split("").map((char, index) => (
        <DockLetter key={`${char}-${index}`} char={char} mouseX={mouseX} />
      ))}
    </h1>
  );
};

const DockLetter = ({ char, mouseX }) => {
  const ref = useRef(null);

  const distance = useMotionValue(1000);

  const scale = useSpring(
    useTransform(distance, [0, 40, 80, 120], [1.45, 1.25, 1.1, 1]),
    {
      stiffness: 400,
      damping: 25,
      mass: 0.2,
    },
  );

  useEffect(() => {
    const updateDistance = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      distance.set(Math.abs(mouseX.get() - center));
    };

    const unsubscribe = mouseX.on("change", updateDistance);

    return () => unsubscribe();
  }, [mouseX, distance]);

  return (
    <motion.span
      ref={ref}
      style={{ scale }}
      className="inline-block origin-bottom"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export default DockName;
