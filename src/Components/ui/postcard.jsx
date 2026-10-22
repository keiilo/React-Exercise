
import React from 'react';

function PostCard({ post }) {
    return (
        <div className="post-card">
            <p className="post-card-message">
                {post.message}
            </p>
        </div>
    );
}

export default PostCard;
