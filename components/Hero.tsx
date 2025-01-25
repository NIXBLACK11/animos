"use client"

import { useRouter } from "next/navigation";


export const Hero = () => {
    const router = useRouter();
    return (
        <div className="bg-transparent w-full h-full flex flex-col items-center">
            <h1 className="text-gray-700 text-5xl">animos</h1>
			<h1 className="text-black ">Σκέψη Ελεύθερη, Γνώση Αιώνια</h1>
            <button 
                className="bg-[#000000] hover:bg-[#0A0A0A] text-white rounded-lg underline p-4"
                onClick={() => {
                    router.push('/notes');
                }}
            >Go to notes</button>
        </div>
    )
}