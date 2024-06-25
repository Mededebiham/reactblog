import React from 'react';
import PostHeader from "./PostHeader";
import PostsFooter from "./PostsFooter";

const PostCard = ({post, cropped = true, footer = true, children}) => {
    return (
        <li key={post.id}
            className="my-4 p-6 bg-surface0 border border-mantle rounded-lg shadow">
            <PostHeader post={post}/>
            <p className={`mb-3 font-normal text-text ${cropped && "line-clamp-4"}`}>{post.content}</p>
            {footer && <PostsFooter postId={post.id}/>}
            {children}
        </li>
    );
};

export default PostCard;