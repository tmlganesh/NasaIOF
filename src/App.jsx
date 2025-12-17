
import React, { useState } from 'react';
import DateSelector from './components/DateSelector';
import ImageReveal from './components/ImageReveal';
import hubbleData from './data/hubble_data.json';
import './index.css';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showReveal, setShowReveal] = useState(false);

    const handleDateSelect = (month, day) => {
        setLoading(true);
        setShowReveal(false);

        // Simulate network delay for effect
        setTimeout(() => {
            const key = `${month.toLowerCase()}-${day}`;
            const foundData = hubbleData[key];

            if (foundData) {
                setData(foundData);
                setShowReveal(true);
            } else {
                console.error("No data found for", key);
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="app-container">
            <div className="stars"></div>
            <div className="content">
                {!showReveal ? (
                    <div className="intro">
                        <h1>What Did Hubble See on Your Birthday? Check!!</h1>
                        <p>Enter your birthday to find out!</p>
                        <DateSelector onDateSelect={handleDateSelect} />
                    </div>
                ) : (
                    <ImageReveal data={data} loading={loading} onRestart={() => setShowReveal(false)} />
                )}

                {loading && <div className="loading-overlay">Searching Universe...</div>}
            </div>
        </div>
    );
}

export default App;
