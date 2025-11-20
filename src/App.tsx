import { useState } from "react";

interface Plan {
    name: string,
    price: number,
};

interface ServicePlans {
    [name: string]: Plan[],
}

const shows = [
    { name: "Stranger Things", service: "Netflix" },
    { name: "The Witcher", service: "Netflix" },
    { name: "The Mandalorian", service: "Disney+" },
    { name: "The Avengers", service: "Disney+" },
    { name: "Peacemaker", service: "Amazon Prime Video" },
    { name: "Invincible", service: "Amazon Prime Video" },
    { name: "House of the Dragon", service: "Max" },
    { name: "The Last of Us", service: "Max" },
    { name: "Ted Lasso", service: "Apple TV+" },
    { name: "Severance", service: "Apple TV+" },
    { name: "Yellowstone", service: "Peacock" },
    { name: "Twisted Metal", service: "Peacock" },
    { name: "Halo", service: "Paramount+" },
    { name: "South Park", service: "Paramount+" }
];

const servicePlans: ServicePlans = {
    "Netflix": [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 17.99 },
        { name: "Premium", price: 24.99 }
    ],
    "Hulu": [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 },
        
    ],
    "Disney+": [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 }
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

    const allAvailableTiers = Array.from(
        new Set(
            requiredServices
                .flatMap((service) => (servicePlans[service] || []).map((plan) => plan.name))
        )
    );
    const tiers = ["With Ads", "No Ads", "Premium"].filter((tier) => allAvailableTiers.includes(tier));
    const getPreferredPlan = (plans: Plan[], tier: string): Plan | undefined => {
        if (!plans || plans.length === 0) return undefined;
        const exact = plans.find((p) => new RegExp(tier, "i").test(p.name));
        if (exact) return exact;

        const preferenceMap: Record<string, string[]> = {
            "With Ads": ["With Ads", "No Ads", "Premium"],
            "No Ads": ["No Ads", "With Ads", "Premium"],
            "Premium": ["Premium", "No Ads", "With Ads"],
        };

        const prefs = preferenceMap[tier] || [tier];
        for (const pref of prefs) {
            const found = plans.find((p) => new RegExp(pref, "i").test(p.name));
            if (found) return found;
        }

        return plans.reduce((best, p) => (best == null || p.price > best.price ? p : best), plans[0]);
    };

    const totals: Record<string, number> = tiers.reduce((acc, tier) => {
        const sum = requiredServices
            .map((service) => {
                const plans = servicePlans[service] || [];
                const match = getPreferredPlan(plans, tier);
                return match ? match.price : 0;
            })
            .reduce((a, b) => a + b, 0);
        acc[tier] = sum;
        return acc;
    }, {} as Record<string, number>);

    const serviceStyles: Record<string, string> = {
        "Netflix": "bg-red-500 text-white border-red-600",
        "Disney+": "bg-blue-600 text-white border-blue-700",
        "Amazon Prime Video": "bg-cyan-500 text-white border-cyan-600",
        "Max": "bg-purple-600 text-white border-purple-700",
        "Apple TV+": "bg-gray-700 text-white border-gray-800",
        "Peacock": "bg-yellow-300 text-black border-yellow-400",
        "Paramount+": "bg-blue-400 text-white border-blue-500",
        "Hulu": "bg-green-500 text-white border-green-600"
    };

    const showBadgeStyles: Record<string, string> = {
        "Netflix": "bg-red-500",
        "Disney+": "bg-blue-600",
        "Amazon Prime Video": "bg-cyan-500",
        "Max": "bg-purple-600",
        "Apple TV+": "bg-gray-700",
        "Peacock": "bg-yellow-300",
        "Paramount+": "bg-blue-400",
        "Hulu": "bg-green-500"
    };

    // Color the total price text based on thresholds:
    // green: < $30, yellow: < $50, orange: $50-70, red: > $70
    const getTotalTextColor = (total: number) => {
        if (total < 30) return "text-green-600";
        if (total < 50) return "text-yellow-600";
        if (total > 70) return "text-red-600";
        return "text-orange-600";
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
                            className="flex items-center p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                        >
                            <input
                                type="checkbox"
                                checked={selectedShows.includes(show.name)}
                                onChange={() => toggleShow(show.name)}
                                className="mr-4 w-5 h-5"
                            />
                            <span
                                className={`inline-block w-3 h-3 rounded-full mr-4 flex-shrink-0 ${showBadgeStyles[show.service] || 'bg-gray-300'}`}
                                aria-hidden
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
                                const plans = servicePlans[service] || [];
                                // Only show plans that are in the available tiers for this selection
                                const visiblePlans = plans.filter((plan) => tiers.includes(plan.name));
                                return (
                                    <div key={service} className={`${cardClass} p-5 rounded-2xl shadow-xl border`}>
                                        <h3 className="text-xl font-bold mb-3">{service}</h3>
                                        <div className={`flex flex-wrap ${visiblePlans.length === 1 ? "gap-0" : "gap-3"} overflow-hidden`}>
                                            {visiblePlans.map((plan) => (
                                                <div
                                                    key={plan.name}
                                                    className={
                                                        visiblePlans.length === 1
                                                            ? "flex-1 w-full flex flex-col justify-between bg-white/20 p-3 rounded-lg"
                                                            : "flex-1 max-w-xs flex flex-col justify-between bg-white/20 p-3 rounded-lg"
                                                    }
                                                >
                                                    <span className="font-semibold">{plan.name}</span>
                                                    <span className="font-bold mt-2">${plan.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
                        <h3 className="text-lg font-semibold text-center">Total Monthly Cost</h3>
                        <div className={`mt-4 grid grid-cols-1 sm:grid-cols-${tiers.length} gap-4 text-center`}>
                            {tiers.map((tier) => (
                                <div key={tier} className="p-3 bg-white/50 rounded-lg">
                                    <p className="text-sm text-gray-600">{tier}</p>
                                    <p className={`text-2xl font-extrabold mt-1 ${getTotalTextColor(totals[tier])}`}>${totals[tier].toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;