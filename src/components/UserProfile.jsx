import React from 'react';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import GreenGoalsDashboard from './GreenGoalsDashboard'; // Re-use from Feature 2
import EcoBadges from './EcoBadges'; // Re-use from Feature 7

const UserProfile = ({ loggedInUser }) => {
    const location = useLocation(); // Hook to get current URL location

    if (!loggedInUser) {
        return <p style={{ textAlign: 'center', color: '#e63946', fontSize: '1.2em', marginTop: '50px' }}>Please log in to view your profile.</p>;
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Hello, {loggedInUser.name}! Your Eco-Profile</h2>

            <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                <Link to="details" style={{
                    padding: '10px 15px', textDecoration: 'none', color: '#555', fontWeight: 'bold',
                    borderBottom: location.pathname.includes('/profile/details') || location.pathname === '/profile' ? '2px solid #4CAF50' : 'none',
                    marginRight: '15px'
                }}>Profile Details</Link>
                <Link to="goals" style={{
                    padding: '10px 15px', textDecoration: 'none', color: '#555', fontWeight: 'bold',
                    borderBottom: location.pathname.includes('/profile/goals') ? '2px solid #4CAF50' : 'none',
                    marginRight: '15px'
                }}>My Green Goals</Link>
                <Link to="badges" style={{
                    padding: '10px 15px', textDecoration: 'none', color: '#555', fontWeight: 'bold',
                    borderBottom: location.pathname.includes('/profile/badges') ? '2px solid #4CAF50' : 'none',
                    marginRight: '15px'
                }}>My Badges</Link>
                {/* Add more links for other settings like notifications */}
            </div>

            {/* Nested Routes for profile sections */}
            <Routes>
                <Route path="/" element={<ProfileDetails loggedInUser={loggedInUser} />} />
                <Route path="details" element={<ProfileDetails loggedInUser={loggedInUser} />} />
                <Route path="goals" element={<GreenGoalsDashboard />} /> {/* Using the existing component */}
                <Route path="badges" element={<EcoBadges />} /> {/* Using the existing component */}
                {/* Add routes for other sections */}
            </Routes>
        </div>
    );
};

// Sub-component for basic profile details
const ProfileDetails = ({ loggedInUser }) => {
    // You could make these editable with state
    return (
        <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
            <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>Basic Information</h4>
            <p><strong>Email:</strong> {loggedInUser.email}</p>
            <p><strong>Name:</strong> {loggedInUser.name}</p>
            <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#777' }}>
                (This section can be expanded to include editable fields like preferred name, location, etc.)
            </p>
        </div>
    );
};

export default UserProfile;