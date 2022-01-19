import { useEffect, useState } from 'react';
import './App.css';

const splitTimeSections = (diff) => {
    const time = [];
    const transformers = [8.64e7, 3.6e6, 60000, 1000];
    for (const divisor of transformers) {
        const x = Math.floor(diff / divisor);
        diff = diff - x * divisor;
        time.push(x);
    }
    return time;
};

function Time({ value, section }) {
    let digits = [];
    while (value !== 0) {
        digits.push(value % 10);
        value = Math.floor(value / 10);
    }
    digits.reverse();
    digits = digits.length ? digits : [0];

    return (
        <div className="group">
            <div className="digits">
                {digits.map((d, i) => (
                    <h1 key={i}>{d}</h1>
                ))}
            </div>
            <h4>{section}</h4>
        </div>
    );
}

function Countdown({ target }) {
    const [diff, setDiff] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setDiff(Math.max(0, target - new Date()));
        }, 1000);

        return () => clearInterval(id);
    }, [target]);

    const time = splitTimeSections(diff);

    const sections = ['Days', 'Hours', 'Minutes', 'Seconds'];

    return (
        <div className="countdown">
            {time.map((t, i) => (
                <Time key={i} section={sections[i]} value={t} />
            ))}
        </div>
    );
}

export default function App() {
    const [target, setTarget] = useState(new Date());

    return (
        <div className="App">
            <h2>Countdown</h2>
            <Countdown target={target} />
            <input
                type="datetime-local"
                name="target"
                onChange={(e) => setTarget(new Date(e.target.value))}
            />
        </div>
    );
}
