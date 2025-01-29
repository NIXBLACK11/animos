"use client"

import { useRouter } from "next/navigation";
import { FaChevronCircleRight, FaHandSparkles } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";

export const Hero = () => {
    const router = useRouter();
    
    return (
        <div className="bg-transparent w-full h-full flex flex-col items-center justify-center relative">
            <div className="text-center space-y-8 relative">
                <div className="space-y-2">
                    <h1 className="text-8xl tracking-[0.2em] text-neutral-800 mb-4">
                        animos
                    </h1>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-serif text-neutral-800">
                            Σκέψη Ελεύθερη, Γνώση Αιώνια
                        </h2>
                        <p className="text-lg text-neutral-600 font-light tracking-wide">
                            Free Thought, Eternal Knowledge
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-6 mt-12">
                    <button 
                        onClick={() => router.push('/notes')}
                        className="group relative inline-flex items-center justify-center gap-2 
                                 bg-gradient-to-r from-neutral-900 to-neutral-800
                                 text-white px-8 py-4 rounded-xl
                                 hover:shadow-lg hover:from-neutral-800 hover:to-neutral-700
                                 transition-all duration-300 ease-out"
                    >
                        <LuPencilLine className="w-5 h-5" />
                        <span className="text-lg font-medium">Start Writing</span>
                        <FaChevronCircleRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                    
                    <p className="text-neutral-600 text-sm flex items-center gap-2">
                        <FaHandSparkles className="w-4 h-4" />
                        Begin your journey of eternal knowledge
                    </p>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] 
                          bg-gradient-to-br from-neutral-200/20 to-neutral-50/20 
                          rounded-full blur-3xl -z-10" />
        </div>
    );
};