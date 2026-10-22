import React, { useState, useEffect } from 'react';
import { getPost, storePost } from '../../api/post';
import './styles/post.css';
import PostCard from './postcard';

function Post() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPost();
                const data = response.data.data || response.data;
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    'Failed to load posts. Please try again.'
                );
            }
        };

        fetchPosts();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Post cannot be empty');
            return;
        }

        setProcessing(true);
        setError('');

        try {
            const response = await storePost({ message });
            const newPost = response.data.data || response.data;

            setPosts((prevPosts) => [newPost, ...prevPosts]);
            setMessage('');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to share post. Please try again.'
            );
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="post-container">
            <form className="post-form" onSubmit={submit}>
                <textarea
                    className="post-textarea"
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={processing}
                />

                {error && (
                    <p className="post-error">{error}</p>
                )}

                <button
                    className="post-submit-btn"
                    type="submit"
                    disabled={processing}
                >
                    {processing ? 'POSTING...' : 'SHARE POST'}
                </button>
            </form>

            <div className="post-list">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Post;
