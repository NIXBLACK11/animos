import { BsCheckLg } from "react-icons/bs";

interface Plan {
    tier: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

export const PricingCard: React.FC<Plan> = ({ tier, price, features, isPopular }) => (
    <div className={`w-full rounded-lg p-6 ${isPopular ? 'border-2 border-blue-500' : 'border border-neutral-800'} bg-neutral-900`}>
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
            {isPopular && (
                <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full">
                    Most Popular
                </span>
            )}
        </div>

        <div className="space-y-6">
            <div className="text-white">
                <span className="text-4xl font-bold">${price}</span>
                <span className="text-neutral-400">/month</span>
            </div>

            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-neutral-300">
                        <BsCheckLg className="w-5 h-5 text-blue-500" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>

        {tier == "Basic" ? <button className="w-full mt-8 py-4 px-6 text-lg font-semibold text-white rounded-lg bg-neutral-800 transition-colors">
            Free
        </button> :
            <button className="w-full mt-8 py-4 px-6 text-lg font-semibold text-white rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                Get Started
            </button>
        }
    </div>
);