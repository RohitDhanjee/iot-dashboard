// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css"; // Import CSS for styling

// const Dashboard = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/sensors");
//             setData(response.data);
//         } catch (error) {
//             console.error("Error fetching sensor data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData(); // Fetch data on component mount
//         const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

//         return () => clearInterval(interval); // Cleanup interval on unmount
//     }, []);

//     return (
//         <div className="dashboard">
//             <h1>IoT Sensor Data</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Temperature (°C)</th>
//                         <th>Humidity (%)</th>
//                         <th>Air Quality</th>
//                         <th>Timestamp</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((sensor, index) => (
//                         <tr key={index}>
//                             <td>{sensor.temperature}°C</td>
//                             <td>{sensor.humidity}%</td>
//                             <td>{sensor.air_quality}</td>
//                             <td>{new Date(sensor.timestamp).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from "recharts";
// import "./Dashboard.css"; // Import CSS for styling

// const Dashboard = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/sensors");
//             console.log("Sensor Data:", response.data); // Log data to check timestamps
//             setData(response.data);
//         } catch (error) {
//             console.error("Error fetching sensor data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData(); // Fetch data on component mount
//         const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

//         return () => clearInterval(interval); // Cleanup interval on unmount
//     }, []);

//     return (
//         <div className="dashboard">
//             <h1>IoT Sensor Data</h1>

//             {/* Separate Charts for Temperature, Humidity, Air Quality */}
//             <div className="charts-container">

//                 {/* Temperature Chart */}
//                 <div className="chart-container">
//                     <h2>Temperature Trend</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis 
//   dataKey="timestamp" 
//   tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
// />

// <Tooltip 
//   labelFormatter={(label) => new Date(label).toLocaleString()} 
// />
//                             <YAxis domain={[0, "dataMax + 40"]} tickCount={50} />

//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="temperature" stroke="red" name="Temperature (°C)" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Humidity Chart */}
//                 <div className="chart-container">
//                     <h2>Humidity Trend</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis 
//   dataKey="timestamp" 
//   tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
// />

// <Tooltip 
//   labelFormatter={(label) => new Date(label).toLocaleString()} 
// />
//                             <YAxis domain={[0, "dataMax + 40"]} tickCount={50} />
//                             {/* <Tooltip /> */}
//                             <Legend />
//                             <Line type="monotone" dataKey="humidity" stroke="blue" name="Humidity (%)" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Air Quality Chart */}
//                 <div className="chart-container">
//                     <h2>Air Quality Trend</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis 
//   dataKey="timestamp" 
//   tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
// />

// <Tooltip 
//   labelFormatter={(label) => new Date(label).toLocaleString()} 
// />
//                             <YAxis domain={[0, "dataMax + 100"]} tickCount={50} />
//                             {/* <Tooltip /> */}
//                             <Legend />
//                             <Line type="monotone" dataKey="air_quality" stroke="green" name="Air Quality" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>

//             </div>

//             {/* Table for Sensor Data */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Temperature (°C)</th>
//                         <th>Humidity (%)</th>
//                         <th>Air Quality</th>
//                         <th>Timestamp</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((sensor, index) => (
//                         <tr key={index}>
//                             <td>{sensor.temperature}°C</td>
//                             <td>{sensor.humidity}%</td>
//                             <td>{sensor.air_quality}</td>
//                             <td>{new Date(sensor.timestamp).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useCallback } from "react"; // Import useCallback
import DatePicker from "react-datepicker";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Dashboard2.css";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import CustomTooltip from "./customtooltip";



const Dashboard = () => {
    const [data, setData] = useState([]);
    const [deviceStatus, setDeviceStatus] = useState("🔴 Disconnected"); // ✅ FIXED: Defined useState for device status
    const [alertMessage, setAlertMessage] = useState(""); // 🔴 Stores alert messages
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    // Set Air Quality Threshold
    const airQualityThreshold = 2000;

    // Function to check and trigger alerts
    const checkAlerts = async (latestData) => {
        if (latestData.air_quality > airQualityThreshold) {
            setAlertMessage(`⚠️ High Air Pollution! AQI: ${latestData.air_quality}`);

            try {
                // 🔹 Send Email Alert (Backend API)
                await axios.post("http://localhost:5000/api/alerts", {
                    type: "Air Quality",
                    value: latestData.air_quality,
                    message: `⚠️ High Air Pollution Detected! AQI: ${latestData.air_quality}`,
                });
            } catch (error) {
                console.error("Error sending alert email:", error);
            }
        } else {
            setAlertMessage(""); // Clear alert when condition is normal
        }
    };

    // Fetch only recent data for real-time display
    const fetchData = useCallback(async () => {
        try {
            // const response = await axios.get("http://localhost:5000/api/sensors");
            // setData(response.data);

            // let url = "http://localhost:5000/api/sensors";
            let url = "http://front-carlee-rohitdhanjee-f6fe86b1.koyeb.app/api/sensors";
            if (startDate && endDate) {
                const startISO = new Date(startDate).toISOString().split("T")[0] + "T00:00:00.000Z";
                const endISO = new Date(endDate).toISOString().split("T")[0] + "T23:59:59.999Z";

                url = `http://front-carlee-rohitdhanjee-f6fe86b1.koyeb.app/api/sensors/filter?start=${startISO}&end=${endISO}`;
            }

            const response = await axios.get(url);
            setData(response.data);

            // ✅ Check ESP32 Connectivity
            if (response.data.length > 0) {

                const latestData = response.data[0];
                const latestTimestamp = new Date(response.data[0].timestamp);
                const now = new Date();
                const timeDiff = (now - latestTimestamp) / 1000; // Difference in seconds

                // If the latest data is less than 10 sec old, mark as Connected
                if (timeDiff < 6) {
                    setDeviceStatus("🟢 Connected");
                } else {
                    setDeviceStatus("🔴 Disconnected");
                }

                // ✅ Check for Air Quality Alerts
                checkAlerts(latestData);
            } else {
                setDeviceStatus("🔴 Disconnected");
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
            setDeviceStatus("🔴 Disconnected");
        }

    }, [startDate, endDate]);

    // Fetch **all** data when exporting
    const fetchAllData = async () => {
        try {
            const response = await axios.get("http://front-carlee-rohitdhanjee-f6fe86b1.koyeb.app/api/sensors/all");
            return response.data; // Return all data
        } catch (error) {
            console.error("Error fetching all sensor data:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]); // ✅ Now it includes fetchData in dependencies

    // 📝 Download JSON File
    const downloadJSON = async () => {
        const allData = await fetchAllData();
        const jsonData = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sensor_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // 📝 Download CSV File
    const downloadCSV = async () => {
        const allData = await fetchAllData();
        const csvRows = [];
        const headers = ["Temperature (°C)", "Humidity (%)", "Air Quality", "Timestamp"];
        csvRows.push(headers.join(",")); // Add CSV headers

        allData.forEach(sensor => {
            const row = [
                sensor.temperature,
                sensor.humidity,
                sensor.air_quality,
                new Date(sensor.timestamp).toLocaleString()
            ];
            csvRows.push(row.join(",")); // Convert array to CSV row
        });

        const csvData = csvRows.join("\n");
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sensor_data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="dashboard">
            <h1>Air Quality Monitoring System</h1>

            {/* 🔹 Device Connectivity Status */}
            <div className="device-status">
                <strong>Device Status:</strong> <span>{deviceStatus}</span>
            </div>

            {/* 🔥 Alert Message */}
            {alertMessage && (
                <div className="alert-box">
                    <strong>{alertMessage}</strong>
                </div>
            )}


            {/* 🎯 Download Buttons */}
            <div className="download-buttons">
                <button onClick={downloadJSON}>Download JSON</button>
                <button onClick={downloadCSV}>Download CSV</button>
            </div>

            {/* 📅 Date Filter */}
            <div className="date-filter">
                <label>Start Date:</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <label>End Date:</label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <button className="fil-btn" onClick={fetchData}>Filter Data</button>
            </div>

            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                />
                <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <YAxis domain={[0, "dataMax + 40"]} tickCount={50} />
                <Legend />

                {/* ✅ Smooth Animation Added */}
                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="red"
                    name="Temperature (°C)"
                    dot={false}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                />
            </LineChart>



            <div className="charts-container">
                {/* Temperature Chart */}
                <div className="chart-container">
                    <h2>Temperature Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                tick={{ fill: "#fff" }} stroke="#aaa"
                                dataKey="timestamp"
                                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            />
                            <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                            content={<CustomTooltip />} type="temperature"
                                labelFormatter={(label) => new Date(label).toLocaleString()}
                            />
                            <YAxis tick={{ fill: "#fff" }} stroke="#aaa" domain={[0, "dataMax + 40"]} tickCount={50} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="red"
                                name="Temprature (°C)"
                                dot={false}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Humidity Chart */}
                <div className="chart-container">
                    <h2>Humidity Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                tick={{ fill: "#fff" }} stroke="#aaa"
                                dataKey="timestamp"
                                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            />
                            <Tooltip content={<CustomTooltip />} type="humidity"
                                labelFormatter={(label) => new Date(label).toLocaleString()}
                            />
                            <YAxis tick={{ fill: "#fff" }} stroke="#aaa" domain={[0, "dataMax + 40"]} tickCount={50} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="humidity"
                                stroke="blue"
                                name="Humidity (%)"
                                dot={false}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Air Quality Chart */}
                <div className="chart-container">
                    <h2>Air Quality Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                tick={{ fill: "#fff" }} stroke="#aaa"
                                dataKey="timestamp"
                                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            />
                            <Tooltip content={<CustomTooltip />} type="air-quality"
                                labelFormatter={(label) => new Date(label).toLocaleString()}
                            />
                            <YAxis tick={{ fill: "#fff" }} stroke="#aaa" domain={[0, "dataMax + 100"]} tickCount={50} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="air_quality"
                                stroke="green"
                                name="Air Quality"
                                dot={false}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table for Sensor Data */}
            <table>
                <thead>
                    <tr>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Air Quality</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((sensor, index) => (
                        <tr key={index}>
                            <td>{sensor.temperature}°C</td>
                            <td>{sensor.humidity}%</td>
                            <td>{sensor.air_quality}</td>
                            <td>{new Date(sensor.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

