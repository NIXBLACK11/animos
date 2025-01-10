"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ImageScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(Math.max(totalScroll, 0), 100)); // Clamp between 0 and 100
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pixelation = Math.max(10 - scrollProgress / 10, 0); // Pixelation decreases as you scroll
  const offset = Math.max(50 - scrollProgress / 2, 0); // Images move closer to center

  return (
    <div style={{ height: "200vh", background: "#f0f0f0" }}>
      <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Image */}
          <motion.img
            src="hand/left.jpg"
            alt="Left"
            initial={{ filter: "blur(10px)", transform: "translateX(-100%)" }}
            animate={{
              filter: `blur(${pixelation}px)`,
              transform: `translateX(-${offset}%)`,
            }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            style={{ width: "200px" }}
          />

          {/* Right Image */}
          <motion.img
            src="hand/right.jpg"
            alt="Right"
            initial={{ filter: "blur(10px)", transform: "translateX(100%)" }}
            animate={{
              filter: `blur(${pixelation}px)`,
              transform: `translateX(${offset}%)`,
            }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            style={{ width: "200px" }}
          />
        </motion.div>
      </div>
    </div>
  );
};
