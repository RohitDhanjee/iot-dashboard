import React from "react";
import "./Dashboard2.css"

// Function to format date (YYYY-MM-DD to a readable format)
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
        weekday: "short", // Example: Mon
        month: "short", // Example: Mar
        day: "numeric", // Example: 12
        year: "numeric" // Example: 2025
    });
};

const CustomTooltip = ({ active, payload, label, type }) => {
    if (active && payload && payload.length) {
        const tooltipClass = `chart-tooltip ${type}`;

        return (
            <div className={tooltipClass}>
                <p><strong>Date:</strong> {formatDate(label)}</p>
                <p>
                    <strong>{type === "temperature" ? "Temperature" :
                            type === "humidity" ? "Humidity" : "Air Quality"}:</strong> 
                    {payload[0].value} {type === "temperature" ? "°C 🌡️" :
                                       type === "humidity" ? "% 💧" :
                                       " AQI 🌫️"}
                </p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;