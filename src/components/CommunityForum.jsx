import React, { useState, useEffect } from 'react';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// Mock data for forum posts
const mockPosts = [
    { id: 1, title: 'Best practices for home composting?', author: 'EcoGuru', date: '2025-07-10', replies: [{ id: 101, author: 'GreenThumb', text: 'Worm composting is amazing!', date: '2025-07-11' }] },
    { id: 2, title: 'Tips for reducing water usage in bathroom?', author: 'WaterSaver', date: '2025-07-08', replies: [] },
    { id: 3, title: 'Where to find affordable solar panels?', author: 'SolarSeeker', date: '2025-07-05', replies: [{ id: 102, author: 'EnergyAdvisor', text: 'Check out the government incentives first.', date: '2025-07-06' }] },
];

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [showReplyForm, setShowReplyForm] = useState(null); // Stores ID of post to reply to
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        // Simulate fetching posts
        const timer = setTimeout(() => {
            setPosts(mockPosts);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAddPost = (e) => {
        e.preventDefault();
        if (newPostTitle.trim()) {
            const newPost = {
                id: Date.now(),
                title: newPostTitle,
                author: 'CurrentUser', // Simulate logged-in user
                date: new Date().toISOString().slice(0, 10),
                replies: []
            };
            setPosts([newPost, ...posts]); // Add to top
            setNewPostTitle('');
        }
    };

    const handleAddReply = (postId) => {
        if (replyText.trim()) {
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        replies: [...post.replies, { id: Date.now(), author: 'CurrentUser', text: replyText, date: new Date().toISOString().slice(0, 10) }]
                    }
                    : post
            ));
            setReplyText('');
            setShowReplyForm(null); // Hide form
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Community Forum</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Share your ideas, ask questions, and connect with fellow eco-warriors!</p>

            <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Start a new discussion..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    style={{ flexGrow: 1 }}
                    required
                />
                <button type="submit" className="btn btn-success">Post Discussion</button>
            </form>

            <div className="forum-posts">
                {loading ? (
                    <>
                        <ShimmerPlaceholder height="120px" width="100%" borderRadius="8px" />
                        <ShimmerPlaceholder height="120px" width="100%" borderRadius="8px" />
                    </>
                ) : (
                    posts.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No discussions yet. Be the first to post!</p>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#fefefe' }}>
                                <h3 style={{ color: '#4CAF50', marginBottom: '5px' }}>{post.title}</h3>
                                <p style={{ fontSize: '0.9em', color: '#888', marginBottom: '10px' }}>By {post.author} on {post.date}</p>

                                <div style={{ borderTop: '1px dashed #eee', paddingTop: '10px', marginTop: '10px' }}>
                                    {post.replies.length > 0 ? (
                                        post.replies.map(reply => (
                                            <div key={reply.id} style={{ background: '#f9f9f9', borderLeft: '3px solid #ccc', padding: '8px 10px', marginBottom: '8px', borderRadius: '4px' }}>
                                                <p style={{ margin: 0, fontSize: '0.9em' }}>
                                                    <span style={{ fontWeight: 'bold' }}>{reply.author}:</span> {reply.text}
                                                </p>
                                                <span style={{ fontSize: '0.75em', color: '#aaa' }}>{reply.date}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ fontSize: '0.9em', color: '#999' }}>No replies yet. Be the first!</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => setShowReplyForm(showReplyForm === post.id ? null : post.id)}
                                    className="btn"
                                    style={{ background: 'none', border: '1px solid #ccc', color: '#555', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}
                                >
                                    {showReplyForm === post.id ? 'Cancel Reply' : 'Reply'}
                                </button>

                                {showReplyForm === post.id && (
                                    <form onSubmit={(e) => { e.preventDefault(); handleAddReply(post.id); }} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Write your reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            style={{ flexGrow: 1 }}
                                            required
                                        />
                                        <button type="submit" className="btn btn-success">Submit Reply</button>
                                    </form>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default CommunityForum;