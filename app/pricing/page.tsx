import { PricingCard } from '@/components/ui/PricingCard';
import React from 'react';

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

export default function Pricing() {
    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-neutral-400">
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
        </div>
    );
};