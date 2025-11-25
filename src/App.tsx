import { useMemo, useState } from "react";

interface Plan {
    name: string;
    price: number;
}

interface ServicePlans {
    [name: string]: Plan[];
}

const shows = [
    // Apple TV+
    { name: "Ted Lasso", service: "Apple TV+" },
    { name: "Severance", service: "Apple TV+" },
    { name: "Foundation", service: "Apple TV+" },
    { name: "Slow Horses", service: "Apple TV+" },
    { name: "The Morning Show", service: "Apple TV+" },
    { name: "For All Mankind", service: "Apple TV+" },
    { name: "Prehistoric Planet", service: "Apple TV+" },
    { name: "Pachinko", service: "Apple TV+" },
    { name: "Mythic Quest", service: "Apple TV+" },
    { name: "Physical", service: "Apple TV+" },
    
    // Amazon Prime Video
    { name: "The Boys", service: "Amazon Prime Video" },
    { name: "Invincible", service: "Amazon Prime Video" },
    { name: "Fallout", service: "Amazon Prime Video" },
    { name: "Reacher", service: "Amazon Prime Video" },
    { name: "Absentia", service: "Amazon Prime Video" },
    { name: "The Expanse", service: "Amazon Prime Video" },
    { name: "Upload", service: "Amazon Prime Video" },
    { name: "Wheel of Time", service: "Amazon Prime Video" },
    { name: "The Lord of the Rings: Rings of Power", service: "Amazon Prime Video" },
    { name: "Fleabag", service: "Amazon Prime Video" },
    { name: "The Boys Presents: Diabolical", service: "Amazon Prime Video" },
    
    // Disney+
    { name: "The Mandalorian", service: "Disney+" },
    { name: "Loki", service: "Disney+" },
    { name: "WandaVision", service: "Disney+" },
    { name: "Andor", service: "Disney+" },
    { name: "The Bear", service: "Disney+" },
    { name: "Agatha All Along", service: "Disney+" },
    { name: "Echo", service: "Disney+" },
    { name: "Moon Knight", service: "Disney+" },
    { name: "Falcon and the Winter Soldier", service: "Disney+" },
    { name: "Hawkeye", service: "Disney+" },
    { name: "She-Hulk: Attorney at Law", service: "Disney+" },
    { name: "What If...?", service: "Disney+" },
    { name: "Big City Greens", service: "Disney+" },
    { name: "X-Men '97", service: "Disney+" },
    
    // Max
    { name: "House of the Dragon", service: "Max" },
    { name: "The Last of Us", service: "Max" },
    { name: "True Detective", service: "Max" },
    { name: "Chernobyl", service: "Max" },
    { name: "IT: Welcome to Derry", service: "Max" },
    { name: "Game of Thrones", service: "Max" },
    { name: "Succession", service: "Max" },
    { name: "Euphoria", service: "Max" },
    { name: "The White Lotus", service: "Max" },
    { name: "Mare of Easttown", service: "Max" },
    { name: "Veep", service: "Max" },
    { name: "The Leftovers", service: "Max" },
    { name: "Westworld", service: "Max" },
    { name: "Dune: Prophecy", service: "Max" },
    
    // Netflix
    { name: "Stranger Things", service: "Netflix" },
    { name: "Squid Game", service: "Netflix" },
    { name: "Squid Game: The Challenge", service: "Netflix" },
    { name: "The Beast in Me", service: "Netflix" },
    { name: "Emily in Paris", service: "Netflix" },
    { name: "The Witcher", service: "Netflix" },
    { name: "Frankenstein", service: "Netflix" },
    { name: "Wednesday", service: "Netflix" },
    { name: "Bridgerton", service: "Netflix" },
    { name: "One Piece", service: "Netflix" },
    { name: "The Diplomat", service: "Netflix" },
    { name: "A Man on the Inside", service: "Netflix" },
    { name: "Tomb Raider: The Legend of Lara Croft", service: "Netflix" },
    { name: "The Crown", service: "Netflix" },
    { name: "Ozark", service: "Netflix" },
    { name: "Breaking Bad", service: "Netflix" },
    { name: "Money Heist", service: "Netflix" },
    { name: "Dark", service: "Netflix" },
    { name: "You", service: "Netflix" },
    { name: "13 Reasons Why", service: "Netflix" },
    { name: "Narcos", service: "Netflix" },
    { name: "Mindhunter", service: "Netflix" },
    { name: "Daredevil", service: "Netflix" },
    { name: "BoJack Horseman", service: "Netflix" },
    { name: "Cyberpunk: Edgerunners", service: "Netflix" },
    { name: "Avatar: The Last Airbender", service: "Netflix" },
    { name: "Castlevania", service: "Netflix" },
    { name: "Castlevania: Nocturne", service: "Netflix" },
    { name: "Scott Pilgrim Takes Off", service: "Netflix" },
    
    // Paramount+
    { name: "Halo", service: "Paramount+" },
    { name: "Landman", service: "Paramount+" },
    { name: "1883", service: "Paramount+" },
    { name: "1923", service: "Paramount+" },
    { name: "Yellowstone", service: "Paramount+" },
    { name: "Dexter", service: "Paramount+" },
    { name: "Dexter: New Blood", service: "Paramount+" },
    { name: "Smile", service: "Paramount+" },
    { name: "Star Trek: Discovery", service: "Paramount+" },
    { name: "Star Trek: Picard", service: "Paramount+" },
    { name: "School Spirits", service: "Paramount+" },
    { name: "The Offer", service: "Paramount+" },
    
    // Peacock
    { name: "Yellowstone", service: "Peacock" },
    { name: "The Office", service: "Peacock" },
    { name: "Parks and Recreation", service: "Peacock" },
    { name: "Mr. Mercedes", service: "Peacock" },
    { name: "Bel-Air", service: "Peacock" },
    { name: "The Boy Band", service: "Peacock" },
    { name: "Twisted Metal", service: "Peacock" },
    { name: "Poker Face", service: "Peacock" },
    { name: "MacGruber", service: "Peacock" },
    { name: "SNL", service: "Peacock" },
];

const servicePlans: ServicePlans = {
    Netflix: [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 17.99 },
        { name: "Premium", price: 24.99 },
    ],
    Hulu: [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 },
    ],
    "Disney+": [
        { name: "With Ads", price: 11.99 },
        { name: "No Ads", price: 18.99 },
    ],
    Max: [
        { name: "With Ads", price: 10.99 },
        { name: "No Ads", price: 18.49 },
        { name: "Premium", price: 22.99 },
    ],
    "Amazon Prime Video": [
        { name: "With Ads", price: 14.99 },
        { name: "No Ads", price: 17.98 },
    ],
    "Apple TV+": [{ name: "No Ads", price: 6.99 }],
    Peacock: [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 10.99 },
        { name: "Premium", price: 16.99 },
    ],
    "Paramount+": [
        { name: "With Ads", price: 7.99 },
        { name: "No Ads", price: 12.99 },
    ],
};

function App() {
    const [selectedShows, setSelectedShows] = useState<string[]>([]);

    const contentHeight = 'calc(100vh - 140px)';

    const toggleShow = (showName: string) => {
        setSelectedShows((prev) => (prev.includes(showName) ? prev.filter((s) => s !== showName) : [...prev, showName]));
    };
    const resetSelection = () => setSelectedShows([]);

    const requiredServices = useMemo(
        () =>
            Array.from(
                new Set(
                    selectedShows
                        .map((show) => shows.find((s) => s.name === show))
                        .filter((s): s is { name: string; service: string } => Boolean(s))
                        .map((s) => s.service)
                )
            ),
        [selectedShows]
    );

    const allAvailableTiers = Array.from(new Set(requiredServices.flatMap((service) => (servicePlans[service] || []).map((p) => p.name))));
    const tiers = ["With Ads", "No Ads", "Premium"].filter((t) => allAvailableTiers.includes(t));

    const getPreferredPlan = (plans: Plan[], tier: string): Plan | undefined => {
        if (!plans || plans.length === 0) return undefined;
        const exact = plans.find((p) => new RegExp(tier, "i").test(p.name));
        if (exact) return exact;
        const preferenceMap: Record<string, string[]> = {
            "With Ads": ["With Ads", "No Ads", "Premium"],
            "No Ads": ["No Ads", "With Ads", "Premium"],
            Premium: ["Premium", "No Ads", "With Ads"],
        };
        const prefs = preferenceMap[tier] || [tier];
        for (const pref of prefs) {
            const found = plans.find((p) => new RegExp(pref, "i").test(p.name));
            if (found) return found;
        }
        return plans.reduce((best, p) => (best == null || p.price > best.price ? p : best), plans[0]);
    };

    const totals: Record<string, number> = useMemo(() => {
        return tiers.reduce((acc, tier) => {
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
    }, [requiredServices, tiers]);

    const bestTier = useMemo(() => {
        if (tiers.length === 0) return undefined;
        return tiers.reduce((best, t) => (totals[t] < (totals[best] ?? Infinity) ? t : best), tiers[0]);
    }, [tiers, totals]);

    const serviceStyles: Record<string, string> = {
        Netflix: "bg-red-500 text-white",
        "Disney+": "bg-blue-600 text-white",
        "Amazon Prime Video": "bg-cyan-500 text-white",
        Max: "bg-purple-600 text-white",
        "Apple TV+": "bg-gray-700 text-white",
        Peacock: "bg-yellow-300 text-black",
        "Paramount+": "bg-blue-400 text-white",
        Hulu: "bg-green-500 text-white",
    };

    const showBadgeStyles: Record<string, string> = {
        Netflix: "bg-red-500",
        "Disney+": "bg-blue-600",
        "Amazon Prime Video": "bg-cyan-500",
        Max: "bg-purple-600",
        "Apple TV+": "bg-gray-700",
        Peacock: "bg-yellow-300",
        "Paramount+": "bg-blue-400",
        Hulu: "bg-green-500",
    };

    const getTotalTextColor = (total: number) => {
        if (total < 30) return "text-green-600";
        if (total < 50) return "text-yellow-600";
        if (total > 70) return "text-red-600";
        return "text-orange-600";
    };

    return (
        <div className="h-screen overflow-hidden bg-linear-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-full px-4 sm:px-8">
                <header className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Streaming Service Calculator</h1>
                        <p className="text-gray-600 mt-1">Select shows and see services and pricing per tier.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-2 bg-white rounded-full shadow-sm text-sm font-medium">
                            Selected: <span className="font-semibold">{selectedShows.length}</span>
                        </div>
                        <button onClick={resetSelection} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 text-sm">
                            Reset
                        </button>
                    </div>
                </header>

                <div className="flex gap-6 bg-white rounded-2xl shadow-xl p-6 w-full overflow-visible" style={{ height: contentHeight }}>
                    <main className="flex-1 h-full overflow-auto pr-2 pl-1 sm:pl-2 lg:pl-4 py-2 sm:py-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {shows.map((show) => (
                                <label
                                    key={show.name}
                                    className={`flex items-center p-4 rounded-xl shadow-sm cursor-pointer transition-all border border-gray-200 ${selectedShows.includes(show.name) ? "bg-white ring-1 ring-indigo-200 scale-[1.01]" : "bg-gray-50 hover:bg-gray-100"}`}
                                >
                                    <input type="checkbox" checked={selectedShows.includes(show.name)} onChange={() => toggleShow(show.name)} className="mr-4 w-5 h-5" />
                                    <span className={`inline-block w-3 h-3 rounded-full mr-4 shrink-0 ${showBadgeStyles[show.service] || "bg-gray-300"}`} aria-hidden />
                                    <div>
                                        <p className="font-semibold text-lg">{show.name}</p>
                                        <p className="text-gray-600 text-sm">On {show.service}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </main>

                    <aside className="w-96 h-full shrink-0 flex flex-col">
                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm mb-4">
                            <h3 className="text-lg font-semibold text-center">Total Monthly Cost</h3>
                            <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(tiers.length || 1, 3)}, minmax(0,1fr))` }}>
                                {tiers.map((tier) => (
                                    <div key={tier} className={`p-3 rounded-lg ${bestTier === tier ? "ring-2 ring-indigo-300 bg-white" : "bg-white/60"}`}>
                                        <p className="text-sm text-gray-600">{tier}</p>
                                        <p className={`text-2xl font-extrabold mt-1 ${getTotalTextColor(totals[tier])}`}>${totals[tier].toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-3">Required Services</h2>

                        <div className="overflow-auto flex-1 pr-2">
                            {requiredServices.length === 0 ? (
                                <div className="p-4 bg-white rounded-lg shadow-sm text-gray-600">No shows selected</div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                        {requiredServices.map((service) => {
                                        const cardClass = serviceStyles[service] || "bg-white text-blue-900";
                                        const plans = servicePlans[service] || [];
                                        const visiblePlans = plans.filter((p) => tiers.includes(p.name));
                                        return (
                                            <div key={service} className={`${cardClass} p-4 rounded-xl`}>
                                                <h3 className="text-lg font-semibold mb-2">{service}</h3>
                                                <div className="flex gap-2 flex-wrap">
                                                    {visiblePlans.map((plan) => (
                                                        <div key={plan.name} className="px-3 py-2 bg-white/30 rounded-md text-sm flex items-center justify-between gap-4 min-w-[140px]">
                                                            <span className="font-medium">{plan.name}</span>
                                                            <span className="font-bold">${plan.price.toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default App;