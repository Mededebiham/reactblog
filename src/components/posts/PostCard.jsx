import React from 'react';
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const PostCard = ({post, cropped = true, footer = true}) => {
    return (
        <li key={post.id}
            className="my-4 p-6 bg-surface1 border border-overlay0 rounded-lg shadow">
            <PostHeader post={post}/>
            <p className={`mb-3 font-normal text-text ${cropped && "line-clamp-4"}`}>{post.content}</p>
            {footer && <PostFooter postId={post.id}/>}
        </li>
    );
};

export default PostCard;