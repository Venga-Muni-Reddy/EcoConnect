import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CarbonFootprintTracker from './components/CarbonFootprintTracker';
import EcoChallengeBoard from './components/EcoChallengeBoard';
import Marketplace from './components/MarketPlace';
import EcoMap from './components/EcoMap';
import CommunityForum from './components/CommunityForum';
import NewsFeed from './components/NewsFeed';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard'; // For protected route
import NotFound from './components/NotFound'; // A simple 404 page

// Import the Shimmer Placeholder for global use if needed, or per component
import ShimmerPlaceholder from './components/ShimmerPlaceholder';


const App = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [loggedInUser, setLoggedInUser] = useState(null); // Simple auth state

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // --- Mock Authentication (for demonstration) ---
    const handleLogin = (email, password) => {
        if (email === "dummy@gmail.com" && password === "Dummy@123") {
            setLoggedInUser({ email: "dummy@gmail.com", name: "EcoWarrior" });
            return true;
        } else if (email === "admin@gmail.com" && password === "Admin@123") {
             setLoggedInUser({ email: "admin@gmail.com", name: "AdminUser", isAdmin: true });
             return true;
        }
        return false;
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };
    // --- End Mock Authentication ---


    return (
        <Router>
            {/* Offline Message (Feature 12) */}
            {!isOnline && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', padding: '15px',
                    backgroundColor: '#e63946', color: 'white', textAlign: 'center',
                    fontSize: '1.1em', fontWeight: 'bold', zIndex: 1000, boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                }}>
                    <span role="img" aria-label="warning" style={{ fontSize: '1.5em' }}>⚠️</span>
                    <span>Oops! Looks like your **EcoConnection is off-grid**. Please check your internet and reconnect to cultivate change!</span>
                    <span role="img" aria-label="tree" style={{ fontSize: '1.5em' }}>🌳</span>
                </div>
            )}

            <nav style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isOnline ? '0' : '60px' /* Adjust for offline banner */ }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}>EcoConnect</Link>
                <div>
                    {loggedInUser ? (
                        <>
                            <span style={{ marginRight: '15px' }}>Hello, {loggedInUser.name}!</span>
                            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Dashboard</Link>
                            <Link to="/profile" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Profile</Link>
                            {loggedInUser.isAdmin && (
                                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Admin</Link>
                            )}
                            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                    )}
                </div>
            </nav>

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/" element={<Dashboard loggedInUser={loggedInUser} />} /> {/* Home page */}
                    <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} />} />
                    <Route path="/carbon-tracker" element={<CarbonFootprintTracker />} />
                    <Route path="/eco-challenges" element={<EcoChallengeBoard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/eco-map" element={<EcoMap />} />
                    <Route path="/forum" element={<CommunityForum />} />
                    <Route path="/news" element={<NewsFeed />} />
                    <Route path="/profile/*" element={<UserProfile loggedInUser={loggedInUser} />} />  
* 
                    {/* Protected Admin Route */}
                    <Route
                        path="/admin"
                        element={loggedInUser && loggedInUser.isAdmin ? <AdminDashboard /> : <p>Access Denied!</p>}
                    />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;