import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ShimmerPlaceholder from './ShimmerPlaceholder'; // Import shimmer

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Mock data for demonstration
const mockFootprintData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Carbon Footprint (kg CO2e)',
            data: [220, 200, 180, 190, 170, 160],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.3,
        },
    ],
};

const CarbonFootprintTracker = () => {
    const [activity, setActivity] = useState('');
    const [emission, setEmission] = useState('');
    const [footprintData, setFootprintData] = useState(mockFootprintData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Shimmer for 1.5 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleAddEmission = (e) => {
        e.preventDefault();
        if (activity && emission) {
            const newEmission = parseInt(emission);
            if (!isNaN(newEmission)) {
                // Update mock data dynamically (for real app, would be API call)
                const updatedLabels = [...footprintData.labels, `Jul-${footprintData.labels.length + 1}`];
                const updatedData = [...footprintData.datasets[0].data, newEmission];

                setFootprintData({
                    labels: updatedLabels,
                    datasets: [{ ...footprintData.datasets[0], data: updatedData }],
                });
                setActivity('');
                setEmission('');
            }
        }
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Your Carbon Footprint Over Time',
            },
        },
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Carbon Footprint Tracker</h2>

            <form onSubmit={handleAddEmission} style={{ display: 'flex', gap: '10px', marginBottom: '30px', alignItems: 'flex-end' }}>
                <div style={{ flexGrow: 1 }}>
                    <label htmlFor="activity" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Activity:</label>
                    <input
                        type="text"
                        id="activity"
                        className="form-control"
                        placeholder="e.g., Car commute, Vegan meal"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        required
                    />
                </div>
                <div style={{ width: '150px' }}>
                    <label htmlFor="emission" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>CO2e (kg):</label>
                    <input
                        type="number"
                        id="emission"
                        className="form-control"
                        placeholder="e.g., 5"
                        value={emission}
                        onChange={(e) => setEmission(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success" style={{ padding: '10px 20px', height: 'fit-content' }}>Add Entry</button>
            </form>

            <h3 style={{ color: '#2C3E50', marginBottom: '15px' }}>Your Footprint Data</h3>
            {loading ? (
                // Shimmer for the chart area
                <ShimmerPlaceholder height="300px" width="100%" />
            ) : (
                <div style={{ height: '350px' }}> {/* Ensure chart has a height */}
                    <Line data={footprintData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default CarbonFootprintTracker;