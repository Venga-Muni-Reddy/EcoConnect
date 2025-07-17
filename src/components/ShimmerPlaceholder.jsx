import React from 'react';

const ShimmerPlaceholder = ({ width = '100%', height = '100px', borderRadius = '4px', margin = '0 0 10px 0' }) => {
    return (
        <div style={{
            width,
            height,
            borderRadius,
            margin,
            background: 'linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
            overflow: 'hidden',
        }}>
            {/* The actual shimmer animation is in index.css */}
        </div>
    );
};

export default ShimmerPlaceholder;