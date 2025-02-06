import { Hero } from "@/components/Hero";
import { Analytics } from "@vercel/analytics/react";
import { BottomGIF } from "@/components/ui/BottomGIF";
import { ImageBack } from "@/components/ui/ImageBack";

export default function Home() {
	return (
		<div className="h-screen w-screen flex flex-col items-center">
			<Analytics />
			<ImageBack />
			<Hero />
			<BottomGIF />
		</div>
	);
}

// "use client"

// import { useMotionValueEvent, useScroll } from "framer-motion";
// import { useRef, useState } from "react";

// export default function Home() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const text = "This is a random scroll text that I had to put in this, Enjoy!";
//     const [prevText, setPrevText] = useState("");
//     const [nextText, setNextText] = useState("This is a random scroll text that I had to put in this, Enjoy!");

//     const { scrollYProgress } = useScroll({
//         target: containerRef
//     });

//     useMotionValueEvent(scrollYProgress, "change", (value) => {
//         const totalLength = text.length;
//         const scrollIndex = Math.floor(value * totalLength);

//         const updatedPrevText = text.slice(0, scrollIndex);
//         const updatedNextText = text.slice(scrollIndex);

//         setPrevText(updatedPrevText);
//         setNextText(updatedNextText);
//     });

//     return (
//         <div
//             ref={containerRef}
//             className="bg-[#000000] w-full h-[400vh] flex items-center justify-center"
//         >
//             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-[400px]">
//                 <span className="text-6xl font-bold text-white">
//                     {prevText}
//                 </span>
//                 <span className="text-6xl font-bold text-neutral-800">
//                     {nextText}
//                 </span>
//             </div>
//         </div>
//     );
// }