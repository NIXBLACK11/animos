"use client"

import { LuPencilLine } from "react-icons/lu";
import { AIWriting } from "./ui/AIWriting";
import { HumanWriting } from "./ui/HumanWriting";
import { PricingCard } from "./ui/PricingCard";
import { FaChevronCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Plan {
    tier: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

const plans: Plan[] = [
    {
        tier: "Basic",
        price: 0,
        features: [
            "Basic features access",
            "Web Search avaiable",
            "Community support",
        ]
    },
    {
        tier: "Premium",
        price: 29,
        features: [
            "All Basic features",
            "Web search avaiable",
            "Generating templates",
            "Reseacrh paper seacrh",
        ],
        isPopular: true
    },
    // {
    //     tier: "Pro-(Coming Soon)",
    //     price: 49,
    //     features: [
    //         "All Premium features",
    //         "Unlimited projects",
    //         "24/7 dedicated support",
    //         "50GB storage",
    //         "Daily updates",
    //         "Custom integrations",
    //         "API access"
    //     ]
    // }
];

export const Features = () => {
    const router = useRouter();
    const humanText = `This is how we type: "The quick brown fox jumpd over the lazt dog in a hury to get to it den."`;
    const aiText = `But this is how AI types: "The quick brown fox jumped over the lazy dog in a hurry to get to its den, moving swiftly under the golden evening sky."`;

    return (
        <div className="relative">
            <div className="h-[400vh]">
                <HumanWriting text={humanText} speed={1.2} />
            </div>
            <div className="h-[200vh]">
                <AIWriting text={aiText} speed={4} />
            </div>
            <div className="bg-[#000000] w-full h-[100vh] flex justify-center items-center text-center flex-col">
                <h1 className="text-4xl text-white font-bold">Notice the difference? Try Animos for speed, accuracy, and effortless writing—never worry about typos again!</h1>
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mt-5">
                            Choose Your Plan
                        </h1>
                        <p className="text-xl text-neutral-400 pb-5">
                            Select the perfect plan for your needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-44 md:grid-cols-2 lg:grid-cols-2">
                        {plans.map((plan) => (
                            <PricingCard
                                key={plan.tier}
                                {...plan}
                            />
                        ))}
                    </div>
                </div>
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
            </div>
        </div>
    );
};