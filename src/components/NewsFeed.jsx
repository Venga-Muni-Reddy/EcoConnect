import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// Mock News Data (replace with actual API in production)
const mockNewsArticles = [
    { id: 1, title: 'New Breakthrough in Renewable Energy', source: 'EcoTimes', category: 'energy', date: '2025-07-15', url: '#', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldb2n_cK-UnZjdq1NPjzLxzOSA3z2uHMZoQ&s' },
    { id: 2, title: 'Local Community Launches Composting Initiative', source: 'GreenCity News', category: 'community', date: '2025-07-14', url: '#', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJcCQRWEI0rrC4-ghpVU9yhTBG-skd6bgIw&s' },
    { id: 3, title: 'Impact of Plastic on Marine Life', source: 'Oceanic Watch', category: 'pollution', date: '2025-07-12', url: '#', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2fsigixoiCDjY0zAN17ip2SdOgjDS8zFtw&s' },
    { id: 4, title: 'Guide to Sustainable Fashion Brands', source: 'Style & Sustain', category: 'lifestyle', date: '2025-07-11', url: '#', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFOZuUPzf0JtETtLSweTsPhm3OWKvO0lwXg&s' },
    { id: 5, title: 'Climate Change Report: Urgent Action Needed', source: 'Global Eco', category: 'climate', date: '2025-07-09', url: '#', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPlBGoByQspLyDxewfTxxwTmjriVfBhCARA&s' },
];

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Energy', 'Community', 'Pollution', 'Lifestyle', 'Climate'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setArticles(mockNewsArticles);
                setFilteredArticles(mockNewsArticles); // Initialize filtered with all articles
            } catch (error) {
                console.error("Failed to fetch news articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredArticles(articles);
        } else {
            setFilteredArticles(articles.filter(article =>
                article.category.toLowerCase() === selectedCategory.toLowerCase()
            ));
        }
    }, [selectedCategory, articles]); // Re-filter when category or articles change

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Eco News & Articles</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Stay informed about the latest environmental news and sustainable innovations.</p>

            <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="btn"
                        style={{
                            padding: '8px 15px',
                            borderRadius: '20px',
                            border: `1px solid ${selectedCategory === cat ? '#4CAF50' : '#ddd'}`,
                            backgroundColor: selectedCategory === cat ? '#4CAF50' : 'white',
                            color: selectedCategory === cat ? 'white' : '#333',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9em'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <ShimmerPlaceholder key={i} height="200px" width="100%" borderRadius="8px" />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {filteredArticles.length === 0 ? (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>No articles found for this category.</p>
                    ) : (
                        filteredArticles.map(article => (
                            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden',
                                    backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    height: '100%', display: 'flex', flexDirection: 'column'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.12)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                                >
                                    <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                    <div style={{ padding: '15px', flexGrow: 1 }}>
                                        <h3 style={{ fontSize: '1.1em', color: '#34495e', marginBottom: '8px' }}>{article.title}</h3>
                                        <p style={{ fontSize: '0.85em', color: '#666' }}>{article.source} - {article.date}</p>
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NewsFeed;