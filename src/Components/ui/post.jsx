import React, { useState } from 'react';
import PostCard from './postcard';
import './styles/post.css';

function Post() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Please write something before posting.');
            return;
        }

        const newPost = {
            id: Date.now(),
            message: message.trim(),
            createdAt: new Date().toLocaleString(),
        };

        setPosts((previousPosts) => [newPost, ...previousPosts]);
        setMessage('');
        setError('');
    };

    return (
        <main className="post-page">
            <header className="post-header">
                <div className="post-brand">POSTSPACE</div>
                <p>Your thoughts, your space.</p>
            </header>

            <section className="post-content">
                <h1>Community Feed</h1>
                <p className="post-subtitle">
                    Share what's on your mind.
                </p>

                <form className="post-form" onSubmit={submit}>
                    <label htmlFor="post-message">
                        Create a post
                    </label>

                    <textarea
                        id="post-message"
                        className="post-textarea"
                        placeholder="What's on your mind?"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setError('');
                        }}
                        maxLength={1000}
                        rows={5}
                    />

                    <div className="post-form-footer">
                        <span className="post-character-count">
                            {message.length}/1000
                        </span>

                        <button
                            className="post-submit-btn"
                            type="submit"
                        >
                            Share post
                        </button>
                    </div>

                    {error && (
                        <p className="post-error" role="alert">
                            {error}
                        </p>
                    )}
                </form>

                <div className="post-feed-heading">
                    <h2>Recent posts</h2>
                    <span>{posts.length} posts</span>
                </div>

                {posts.length === 0 ? (
                    <div className="post-empty">
                        <h3>No posts yet</h3>
                        <p>Be the first to share something!</p>
                    </div>
                ) : (
                    <div className="post-list">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>

            <footer className="post-footer">
                Made for sharing ideas.
            </footer>
        </main>
    );
}

export default Post;