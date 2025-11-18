import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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

// Streaming service prices
const servicePrices = {
    "Netflix": 17.99,
    "Hulu": 14.99,
    "Disney+": 13.99,
    "Max": 15.99,
    "Amazon Prime Video": 14.99,
    "Apple TV+": 9.99,
    "Peacock": 7.99,
    "Paramount+": 11.99
};
const servicePricesWithAds = {
    "Netflix": 7.99,
    "Hulu": 14.99,
    "Disney+": 13.99,
    "Max": 15.99,
    "Amazon Prime Video": 14.99,
    "Apple TV+": 9.99,
    "Peacock": 7.99,
    "Paramount+": 11.99
};

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
