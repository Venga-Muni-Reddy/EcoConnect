import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For mock API call
import ShimmerPlaceholder from './ShimmerPlaceholder'; // Import shimmer

// Mock API data
const mockChallenges = [
    { id: 1, name: 'Community Park Cleanup', description: 'Help us clean up the local park. Gloves and bags provided!', date: '2025-07-20', location: 'Central Park', joined: false },
    { id: 2, name: 'Urban Gardening Project', description: 'Plant native species in public spaces.', date: '2025-07-25', location: 'Community Garden', joined: false },
    { id: 3, name: 'Recycle-a-thon Drive', description: 'Bring your recyclables to our collection point.', date: '2025-08-01', location: 'City Hall Square', joined: true },
    { id: 4, name: 'No-Plastic July Pledge', description: 'Commit to reducing single-use plastics for the month.', date: '2025-07-01', location: 'Online', joined: false },
];

const EcoChallengeBoard = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallenges = async () => {
            // Simulate API call with a delay
            try {
                setLoading(true);
                // In a real app, this would be: const response = await axios.get('/api/challenges');
                // For now, use mock data after a delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                setChallenges(mockChallenges);
            } catch (error) {
                console.error("Failed to fetch challenges:", error);
                // In a real app, you'd show an error message to the user
            } finally {
                setLoading(false);
            }
        };
        fetchChallenges();
    }, []);

    const handleJoinChallenge = (id) => {
        setChallenges(challenges.map(challenge =>
            challenge.id === id ? { ...challenge, joined: !challenge.joined } : challenge
        ));
    };

    return (
        <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Local Eco-Challenge Board</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Join local initiatives to make a tangible impact in your community!</p>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {[1, 2, 3].map(i => (
                        <ShimmerPlaceholder key={i} height="180px" width="100%" borderRadius="8px" />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {challenges.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>No challenges available right now.</p>}
                    {challenges.map(challenge => (
                        <div key={challenge.id} style={{
                            border: '1px solid #ddd', borderRadius: '8px', padding: '15px',
                            backgroundColor: '#fefefe', boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                        }}>
                            <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>{challenge.name}</h3>
                            <p style={{ fontSize: '0.9em', color: '#666', flexGrow: 1 }}>{challenge.description}</p>
                            <div style={{ fontSize: '0.85em', color: '#777', marginTop: '10px' }}>
                                <p><strong>Date:</strong> {challenge.date}</p>
                                <p><strong>Location:</strong> {challenge.location}</p>
                            </div>
                            <button
                                onClick={() => handleJoinChallenge(challenge.id)}
                                className={challenge.joined ? 'btn btn-outline-success' : 'btn btn-success'}
                                style={{
                                    marginTop: '15px',
                                    backgroundColor: challenge.joined ? '#f8f9fa' : '#4CAF50',
                                    color: challenge.joined ? '#4CAF50' : 'white',
                                    borderColor: '#4CAF50',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    padding: '8px 15px',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {challenge.joined ? 'Joined 🎉' : 'Join Challenge'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EcoChallengeBoard;