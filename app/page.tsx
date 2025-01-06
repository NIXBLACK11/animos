import GoogleSign from "@/components/GoogleSign";

export default function Home() {
	return (
		<div className="bg-[#000000] h-screen w-screen">
			<div className="absolute bg-gray-800 pt-0 mt-0">
				<GoogleSign />
			</div>
		</div>
	);
}
