"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div 
            ref={targetRef}
            style={{opacity}}
        >
            <p className="text-red-500 bg-blue-500 z-0">
                This is the mption
            </p>
        </motion.div>
    )
}