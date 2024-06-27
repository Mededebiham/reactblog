import React from 'react';
import PostHeader from "./PostHeader";
import PostsFooter from "./PostsFooter";

const PostCard = ({ post, cropped = true, footer = true, children }) => {
    return (
        <li key={post.id}
            className="my-4 p-6 bg-surface0 border border-mantle rounded-lg shadow">
            <PostHeader post={post} />
            <div className={`mb-3 font-normal text-text ${cropped && "line-clamp-4"}`} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {footer && <PostsFooter postId={post._id} />}
            {children}
        </li>
    );
};

export default PostCard;
