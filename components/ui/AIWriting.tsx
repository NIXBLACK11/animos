"use client"

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface WritingProps {
    text: string;
    speed: number;
}

export const AIWriting = ({ text, speed }: WritingProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [prevText, setPrevText] = useState("");
    const [nextText, setNextText] = useState(text);
    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (!isVisible) return;

        const totalLength = text.length;
        const scrollIndex = Math.floor(value * totalLength * speed);

        const updatedPrevText = text.slice(0, scrollIndex);
        const updatedNextText = text.slice(scrollIndex);

        setPrevText(updatedPrevText);
        setNextText(updatedNextText);
    });

    return (
        <div
            ref={containerRef}
            className="bg-[#000000] w-full h-[200vh] flex items-start justify-center"
        >
            <div
                ref={containerRef}
                className="sticky top-1/2 -translate-y-1/2 w-3/4 flex items-center justify-center transition-opacity duration-300"
            >
                <div>
                    <span className="text-6xl font-bold text-white">
                        {prevText}
                    </span>
                    <span className="text-6xl font-bold text-gray-900">
                        {nextText}
                    </span>
                </div>
            </div>
        </div>
    );
};
