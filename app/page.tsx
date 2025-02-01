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
