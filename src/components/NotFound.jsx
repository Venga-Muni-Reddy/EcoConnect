import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ fontSize: '5em', color: '#e63946' }}>404</h1>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Page Not Found - Lost in the Eco-Wilderness?</h2>
            <p style={{ color: '#666', fontSize: '1.1em', marginBottom: '30px' }}>
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#388e3c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
                Go back to EcoConnect Home
            </Link>
        </div>
    );
};

export default NotFound;