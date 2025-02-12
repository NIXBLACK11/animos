import { Hero } from "@/components/Hero";
import { Analytics } from "@vercel/analytics/react";
import { BottomGIF } from "@/components/ui/BottomGIF";
import { ImageBack } from "@/components/ui/ImageBack";
import { Features } from "@/components/Features";

export default function Home() {
	return (
		<main className="relative w-full">
			<div className="h-screen flex flex-col items-center">
				<Analytics />
				<ImageBack />
				<Hero />
				<BottomGIF />
			</div>
			<Features />
		</main>
	);
}