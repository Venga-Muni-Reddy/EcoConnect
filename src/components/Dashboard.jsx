import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ loggedInUser }) => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>
                Welcome {loggedInUser ? loggedInUser.name : 'Guest'} to EcoConnect!
            </h2>
            <p style={{ lineHeight: '1.6', color: '#555' }}>
                Your hub for sustainable living. Explore the features below to start your eco-friendly journey and make a real impact!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <DashboardCard title="Track Your Footprint" description="Understand your environmental impact." link="/carbon-tracker" />
                <DashboardCard title="Join Eco-Challenges" description="Participate in local green initiatives." link="/eco-challenges" />
                <DashboardCard title="Explore Marketplace" description="Discover sustainable products & services." link="/marketplace" />
                <DashboardCard title="Find Local Green Spots" description="Locate recycling centers, markets & more." link="/eco-map" />
                <DashboardCard title="Community Forum" description="Connect with fellow eco-warriors." link="/forum" />
                <DashboardCard title="Eco News Feed" description="Stay updated on environmental news." link="/news" />
                <DashboardCard title="Your Profile" description="Manage your goals, badges & settings." link="/profile" />
            </div>
        </div>
    );
};

const DashboardCard = ({ title, description, link }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
                border: '1px solid #ddd', borderRadius: '8px', padding: '20px',
                backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
            >
                <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '0.95em', color: '#666' }}>{description}</p>
            </div>
        </Link>
    );
};

export default Dashboard;