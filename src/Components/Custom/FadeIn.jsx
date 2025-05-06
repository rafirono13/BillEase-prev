import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({
  children,
  delay = 0.1,
  direction = "up",
  duration = 0.6,
}) => {
  const y = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const x = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y, x }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default FadeIn;
