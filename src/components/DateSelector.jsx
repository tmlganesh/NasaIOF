
import React, { useState } from 'react';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DateSelector = ({ onDateSelect }) => {
    const [month, setMonth] = useState('May');
    const [day, setDay] = useState(28);

    const handleSubmit = (e) => {
        e.preventDefault();
        onDateSelect(month, day);
    };

    const daysInMonth = (m) => {
        const monthIndex = MONTHS.indexOf(m);
        // 2024 is leap, but let's just use 29 for Feb to be safe for "birthday" logic
        if (monthIndex === 1) return 29;
        if ([3, 5, 8, 10].includes(monthIndex)) return 30;
        return 31;
    };

    const days = Array.from({ length: daysInMonth(month) }, (_, i) => i + 1);

    return (
        <div className="date-selector-container">
            <form onSubmit={handleSubmit} className="date-form">
                <div className="selectors">
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default DateSelector;
