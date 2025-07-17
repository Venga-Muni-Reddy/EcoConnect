import React, { useState, useEffect } from 'react';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// Mock data for locations
const mockLocations = [
    { id: 1, name: 'City Recycling Center', type: 'recycling', lat: 34.0522, lng: -118.2437, description: 'Accepts paper, plastic, glass.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4khaHBguu71yy9UBilrK7SOARk-WUs-clUg&s' },
    { id: 2, name: 'Downtown Farmers Market', type: 'market', lat: 34.0550, lng: -118.2500, description: 'Fresh, local produce every Saturday.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3NK7xQ9qPamnb4OlFfM4zocZZ8OgkM_gEg&s' },
    { id: 3, name: 'Eco-Friendly Cafe "Green Bean"', type: 'business', lat: 34.0500, lng: -118.2400, description: 'Serves organic coffee and vegan pastries.', imageUrl: 'https://static.vecteezy.com/system/resources/previews/055/418/964/large_2x/eco-friendly-coffee-cup-on-coffee-beans-in-natural-setting-perfect-for-cafe-design-and-marketing-photo.jpg' },
    { id: 4, name: 'Community Compost Drop-off', type: 'recycling', lat: 34.0480, lng: -118.2350, description: 'Drop off your food scraps here.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRotZ3tAMVCgPc3l-2kPqz0zC3NbIYvZXKlQw&s' },
    { id: 5, name: 'Public EV Charging Station', type: 'transport', lat: 34.0530, lng: -118.2480, description: 'Fast charging for electric vehicles.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nW582xBEqctK6M72N8SE8Jw13z1timUvaA&s' },
];

const EcoMap = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setLocations(mockLocations);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getIconForType = (type) => {
        switch (type) {
            case 'recycling': return '♻️';
            case 'market': return '🥕';
            case 'business': return '☕';
            case 'transport': return '🔌';
            default: return '📍';
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', minHeight: '600px' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Eco-Map: Find Local Green Spots</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Explore sustainable places and services in your area.</p>

            {loading ? (
                <ShimmerPlaceholder height="400px" width="100%" />
            ) : (
                <div style={{ flexGrow: 1, display: 'flex', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ flex: '0 0 300px', borderRight: '1px solid #eee', padding: '15px', overflowY: 'auto' }}>
                        <h3 style={{ color: '#4CAF50', marginBottom: '15px' }}>Locations</h3>
                        {locations.map(loc => (
                            <div
                                key={loc.id}
                                onClick={() => setSelectedLocation(loc)}
                                style={{
                                    padding: '10px 15px',
                                    borderBottom: '1px dashed #eee',
                                    cursor: 'pointer',
                                    backgroundColor: selectedLocation && selectedLocation.id === loc.id ? '#e6ffe6' : 'transparent',
                                    transition: 'background-color 0.2s ease',
                                    display: 'flex', alignItems: 'center'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = selectedLocation && selectedLocation.id === loc.id ? '#e6ffe6' : 'transparent'}
                            >
                                <span style={{ fontSize: '1.5em', marginRight: '10px' }}>{getIconForType(loc.type)}</span>
                                <span style={{ fontWeight: 'bold' }}>{loc.name}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ flexGrow: 1, padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
                        {selectedLocation ? (
                            <div style={{ textAlign: 'center', maxWidth: '400px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                <img src={selectedLocation.imageUrl} alt={selectedLocation.name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px', border: '3px solid #4CAF50' }} />
                                <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>{selectedLocation.name}</h3>
                                <p style={{ color: '#666', marginBottom: '10px' }}>{selectedLocation.description}</p>
                                <p style={{ fontSize: '0.9em', color: '#888' }}>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
                            </div>
                        ) : (
                            <p style={{ color: '#666', fontSize: '1.1em' }}>Select a location from the left to see details on the map.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EcoMap;