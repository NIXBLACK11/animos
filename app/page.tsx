// import GoogleSign from "@/components/GoogleSign";

import { BottomGIF } from "@/components/ui/BottomGIF";
import { ImageScroll } from "@/components/ui/ImageScroll";

export default function Home() {
	return (
		<div className="bg-[#0A0A0A] h-screen w-screen flex flex-col items-center">
			<h1 className="text-white text-4xl">animos</h1>
			<h1 className="text-white ">Σκέψη Ελεύθερη, Γνώση Αιώνια</h1>
			<ImageScroll />
			<BottomGIF />
		</div>
	);
}
