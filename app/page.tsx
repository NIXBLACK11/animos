// import GoogleSign from "@/components/GoogleSign";
import { Hero } from "@/components/Hero";
import { BottomGIF } from "@/components/ui/BottomGIF";
import { ImageBack } from "@/components/ui/ImageBack";

export default function Home() {
	return (
		<div className="h-screen w-screen flex flex-col items-center">
			<ImageBack />
			<h1 className="text-gray-700 text-5xl">animos</h1>
			<h1 className="text-black ">Σκέψη Ελεύθερη, Γνώση Αιώνια</h1>
			<Hero />
			<BottomGIF />
		</div>
	);
}
