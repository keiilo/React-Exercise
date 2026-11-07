import { useEffect, useState } from 'react';
import api from '../../api/axios';
import PostCard from './postcard';
import './styles/post.css';

function Post() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let active = true;

        const loadPosts = async () => {
            try {
                const { data } = await api.get('/posts');

                if (active) {
                    setPosts(
                        [...data].sort(
                            (a, b) => new Date(b.created_at) - new Date(a.created_at)
                        )
                    );
                }
            } catch {
                if (active) {
                    setError('Could not load posts. Is the Laravel API running?');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadPosts();

        return () => {
            active = false;
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Please write something before posting.');
            return;
        }

        setSubmitting(true);

        try {
            const { data } = await api.post('/posts', {
                message: message.trim(),
            });

            setPosts((previousPosts) => [data.data, ...previousPosts]);
            setMessage('');
            setError('');
        } catch (requestError) {
            const apiMessage =
                requestError.response?.data?.message ||
                'Could not create the post. Please try again.';

            setError(apiMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="post-page">
            <form className="post-form" onSubmit={submit}>
                <textarea
                    id="post-message"
                    className="post-textarea"
                    placeholder="What is happening?!"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setError('');
                    }}
                    maxLength={255}
                    rows={3}
                />

                <button
                    className="post-submit-btn"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? 'Posting...' : 'Post'}
                </button>

                {error && (
                    <p className="post-error" role="alert">
                        {error}
                    </p>
                )}
            </form>

            {loading ? (
                <p className="post-loading">Loading posts...</p>
            ) : (
                <div className="post-list">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}

                    {posts.length === 0 && (
                        <p className="post-empty">No posts yet. Be the first!</p>
                    )}
                </div>
            )}
        </main>
    );
}

export default Post;
