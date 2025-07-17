import React, { useState, useEffect } from 'react';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// Mock data for badges
const mockBadges = [
    { id: 1, name: 'Plastic Purge', description: 'Reduced plastic waste by 50% for a month', icon: '♻️', earned: true },
    { id: 2, name: 'Compost King', description: 'Composted kitchen waste consistently for 3 months', icon: '🌱', earned: false },
    { id: 3, name: 'Cycle Commuter', description: 'Used bike for daily commute for a week', icon: '🚴', earned: true },
    { id: 4, name: 'Water Wizard', description: 'Reduced water usage by 20% in a month', icon: '💧', earned: false },
    { id: 5, name: 'Green Thumb', description: 'Participated in 3 tree-planting drives', icon: '🌳', earned: false },
    { id: 6, name: 'Energy Saver', description: 'Achieved 15% reduction in household energy', icon: '💡', earned: false },
];

const EcoBadges = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user's badges
        const timer = setTimeout(() => {
            setBadges(mockBadges); // In a real app, filter based on user's earned badges
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const earnedBadges = badges.filter(badge => badge.earned);
    const unearnedBadges = badges.filter(badge => !badge.earned);

    return (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#2C3E50', marginBottom: '20px' }}>Your Eco-Badges</h3>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <ShimmerPlaceholder key={i} height="120px" width="100px" borderRadius="8px" margin="0 auto" />
                    ))}
                </div>
            ) : (
                <>
                    {earnedBadges.length > 0 && (
                        <>
                            <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>Earned Badges 🎉</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                                {earnedBadges.map(badge => (
                                    <BadgeCard key={badge.id} badge={badge} earned={true} />
                                ))}
                            </div>
                        </>
                    )}

                    {unearnedBadges.length > 0 && (
                        <>
                            <h4 style={{ color: '#2C3E50', marginBottom: '15px' }}>Unlock More Badges</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                                {unearnedBadges.map(badge => (
                                    <BadgeCard key={badge.id} badge={badge} earned={false} />
                                ))}
                            </div>
                        </>
                    )}

                    {badges.length === 0 && <p style={{ color: '#666', textAlign: 'center' }}>No badges yet. Start achieving your green goals!</p>}
                </>
            )}
        </div>
    );
};

const BadgeCard = ({ badge, earned }) => (
    <div style={{
        border: `1px solid ${earned ? '#4CAF50' : '#ddd'}`,
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: earned ? '#e6ffe6' : '#f9f9f9',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        opacity: earned ? 1 : 0.6,
        transition: 'opacity 0.3s ease'
    }}>
        <span style={{ fontSize: '3em', display: 'block', marginBottom: '10px' }}>{badge.icon}</span>
        <h5 style={{ color: earned ? '#28a745' : '#34495e', marginBottom: '5px' }}>{badge.name}</h5>
        <p style={{ fontSize: '0.8em', color: '#666' }}>{badge.description}</p>
    </div>
);

export default EcoBadges;