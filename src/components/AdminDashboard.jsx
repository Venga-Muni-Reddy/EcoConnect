import React, { useState } from 'react';

const AdminDashboard = () => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDesc, setChallengeDesc] = useState('');
    const [forumPostToModerate, setForumPostToModerate] = useState(''); // Simulate moderation

    const handleAddChallenge = (e) => {
        e.preventDefault();
        if (challengeName && challengeDesc) {
            alert(`Admin: New challenge "${challengeName}" created! (Mock)`);
            setChallengeName('');
            setChallengeDesc('');
        }
    };

    const handleModeratePost = (e) => {
        e.preventDefault();
        if (forumPostToModerate) {
            alert(`Admin: Post "${forumPostToModerate}" has been reviewed. (Mock)`);
            setForumPostToModerate('');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#e67e22', marginBottom: '25px' }}>Admin Panel</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Manage EcoConnect content and users.</p>

            {/* Manage Challenges Section */}
            <div style={{ border: '1px solid #f39c12', borderRadius: '8px', padding: '20px', marginBottom: '30px', background: '#fff7ed' }}>
                <h3 style={{ color: '#f39c12', marginBottom: '15px' }}>Manage Challenges</h3>
                <form onSubmit={handleAddChallenge} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="challengeName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Challenge Name:</label>
                        <input
                            type="text"
                            id="challengeName"
                            className="form-control"
                            value={challengeName}
                            onChange={(e) => setChallengeName(e.target.value)}
                            placeholder="e.g., August Plastic-Free Challenge"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="challengeDesc" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                        <textarea
                            id="challengeDesc"
                            className="form-control"
                            value={challengeDesc}
                            onChange={(e) => setChallengeDesc(e.target.value)}
                            placeholder="Brief description of the challenge."
                            rows="3"
                            required
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success" style={{ backgroundColor: '#f39c12', borderColor: '#f39c12', width: 'fit-content', alignSelf: 'flex-end' }}>Add New Challenge</button>
                </form>
            </div>

            {/* Moderate Forum Posts Section */}
            <div style={{ border: '1px solid #3498db', borderRadius: '8px', padding: '20px', background: '#ebf5fb' }}>
                <h3 style={{ color: '#3498db', marginBottom: '15px' }}>Moderate Forum Posts</h3>
                <form onSubmit={handleModeratePost} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="forumPostId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Post ID to Review (Mock):</label>
                        <input
                            type="text"
                            id="forumPostId"
                            className="form-control"
                            value={forumPostToModerate}
                            onChange={(e) => setForumPostToModerate(e.target.value)}
                            placeholder="e.g., 12345 (Simulate a post ID)"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success" style={{ backgroundColor: '#3498db', borderColor: '#3498db', width: 'fit-content', alignSelf: 'flex-end' }}>Review Post</button>
                </form>
                <p style={{ fontSize: '0.9em', color: '#777', marginTop: '15px' }}>
                    *In a real application, this would involve fetching and displaying actual forum posts for moderation.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;