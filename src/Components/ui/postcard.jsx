import React from 'react';

export default function PostCard({ post }) {
    return (
        <div className="post-card">
            <p className="post-card-message">
                {post.message}
            </p>
        </div>
    );
}
