import React from 'react';

function PostCard({ post }) {
    return (
        <article className="post-card">
            <div className="post-card-top">
                <div className="post-avatar">K</div>

                <div className="post-author">
                    <strong>Kim</strong>
                    <span>{post.createdAt || 'Just now'}</span>
                </div>
            </div>

            <p className="post-card-message">
                {post.message}
            </p>
        </article>
    );
}

export default PostCard;