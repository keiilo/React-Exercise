import React from 'react';

function PostCard({ post }) {
    return (
        <article className="post-card">
            <div className="post-card-meta">
                <strong>Guest User</strong>
                <span>
                    {post.created_at
                        ? new Date(post.created_at).toLocaleString()
                        : 'Just now'}
                </span>
            </div>

            <p className="post-card-message">{post.message}</p>
        </article>
    );
}

export default PostCard;
