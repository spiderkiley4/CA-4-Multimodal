import { useState } from "react";

interface Plan {
    name: string,
    price: number,
};

interface ServicePlans {
    [name: string]: Plan[],
}

// Shows mapped to streaming services
const shows = [
    { name: "Stranger Things", service: "Netflix" },
    { name: "The Witcher", service: "Netflix" },
    { name: "The Mandalorian", service: "Disney+" },
    { name: "Loki", service: "Disney+" },
    { name: "The Boys", service: "Amazon Prime Video" },
    { name: "Invincible", service: "Amazon Prime Video" },
    { name: "House of the Dragon", service: "Max" },
    { name: "The Last of Us", service: "Max" },
    { name: "Ted Lasso", service: "Apple TV+" },
    { name: "Severance", service: "Apple TV+" },
    { name: "Yellowstone", service: "Peacock" },
    { name: "Twisted Metal", service: "Peacock" },
    { name: "Halo", service: "Paramount+" },
    { name: "1883", service: "Paramount+" }
];

// Streaming service plans (example tiers)
const servicePlans: ServicePlans = {
    "Netflix": [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 17.99 },
        { name: "Premium", price: 24.99 }
    ],
    "Hulu": [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 },
        { name: "Premium", price: 18.99 },
        
    ],
    "Disney+": [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 },
        { name: "Premium", price: 18.99 }
    ],
    "Max": [
        { name: "With Ads", price: 10.99 },
        { name: "No Ads", price: 18.49 },
        { name: "Premium", price: 22.99 }
    ],
    "Amazon Prime Video": [
        { name: "With Ads", price: 14.99 },
        { name: "No Ads", price: 17.98 }
    ],
    "Apple TV+": [
        { name: "No Ads", price: 6.99 }
    ],
    "Peacock": [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 10.99 },
        { name: "Premium", price: 16.99 }
    ],
    "Paramount+": [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 12.99 }
    ]
};

function App() {
    const [selectedShows, setSelectedShows] = useState<string[]>([]);

    const toggleShow = (showName: string) => {
        setSelectedShows((prev: string[]) =>
            prev.includes(showName)
                ? prev.filter((s) => s !== showName)
                : [...prev, showName]
        );
    };

    // Determine required services (unique)
    const requiredServices = Array.from(
        new Set(
            selectedShows
                .map((show) => {
                    const found = shows.find((s) => s.name === show);
                    return found && typeof found.service === "string" ? found.service : null;
                })
                .filter((service): service is string => Boolean(service))
        )
    );

    // Totals for each tier (With Ads, No Ads, Premium)
    const tiers = ["With Ads", "No Ads", "Premium"];
    const totals: Record<string, number> = tiers.reduce((acc, tier) => {
        const sum = requiredServices
            .map((service) => {
                const plans = servicePlans[service] || [];
                // try to find an exact match for the tier first
                let match = plans.find((p) => new RegExp(tier, "i").test(p.name));

                // If Premium tier isn't present, fall back to the highest-priced available plan
                if (!match && tier === "Premium" && plans.length > 0) {
                    match = plans.reduce((best, p) => (best == null || p.price > best.price ? p : best), plans[0]);
                }

                return match ? match.price : 0;
            })
            .reduce((a, b) => a + b, 0);
        acc[tier] = sum;
        return acc;
    }, {} as Record<string, number>);

    // Service styling per brand
    const serviceStyles: Record<string, string> = {
        "Netflix": "bg-red-600 text-white border-red-700",
        "Disney+": "bg-blue-700 text-white border-blue-800",
        "Amazon Prime Video": "bg-cyan-600 text-white border-cyan-700",
        "Max": "bg-purple-700 text-white border-purple-800",
        "Apple TV+": "bg-gray-800 text-white border-gray-900",
        "Peacock": "bg-yellow-400 text-black border-yellow-500",
        "Paramount+": "bg-blue-500 text-white border-blue-600",
        "Hulu": "bg-green-600 text-white border-green-700"
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center mb-6">Streaming Cost by Shows</h1>

                <p className="text-gray-600 text-center mb-8">
                    Select the shows you want to watch. We'll tell you which streaming services you need and show pricing for each tier.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shows.map((show) => (
                        <label
                            key={show.name}
                            className="flex items-center p-4 border rounded-xl shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                        >
                            <input
                                type="checkbox"
                                checked={selectedShows.includes(show.name)}
                                onChange={() => toggleShow(show.name)}
                                className="mr-4 w-5 h-5"
                            />
                            <div>
                                <p className="font-semibold text-lg">{show.name}</p>
                                <p className="text-gray-600 text-sm">On {show.service}</p>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Required Services</h2>

                    {requiredServices.length === 0 ? (
                        <p className="text-gray-600">No shows selected</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {requiredServices.map((service) => {
                                const cardClass = serviceStyles[service] || "bg-white text-blue-900 border-blue-300";
                                return (
                                    <div key={service} className={`${cardClass} p-5 rounded-2xl shadow-xl border`}>
                                        <h3 className="text-xl font-bold mb-3">{service}</h3>
                                                    {(() => {
                                                        const plans = servicePlans[service] || [];
                                                        const planContainerClass = `flex flex-wrap ${plans.length === 1 ? "gap-0" : "gap-3"} overflow-hidden`;
                                                        return (
                                                            <div className={planContainerClass}>
                                                                {plans.map((plan) => (
                                                                    <div
                                                                        key={plan.name}
                                                                        className={
                                                                            plans.length === 1
                                                                                ? "flex-1 w-full flex flex-col justify-between bg-white/20 p-3 rounded-lg"
                                                                                : "flex-1 max-w-xs flex flex-col justify-between bg-white/20 p-3 rounded-lg"
                                                                        }
                                                                    >
                                                                        <span className="font-semibold">{plan.name}</span>
                                                                        <span className="font-bold mt-2">${plan.price.toFixed(2)}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    })()}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
                        <h3 className="text-lg font-semibold text-center">Total Monthly Cost</h3>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            {tiers.map((tier) => (
                                <div key={tier} className="p-3 bg-white/50 rounded-lg">
                                    <p className="text-sm text-gray-600">{tier}</p>
                                    <p className="text-2xl font-extrabold mt-1">${totals[tier].toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-4 text-center">Shown per-tier totals across required services.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;