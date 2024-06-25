import React from 'react';
import PostTags from "./PostTags";
import Link from "../Link";

const PostHeader = ({post}) => {
    return (
        <div className="flex justify-between">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-text">{post.title}</h5>
                <PostTags post={post}/>
            </div>
            <div>
                <div
                    className="flex flex-col items-end text-sm justify-start pl-2 border-l-2 border-l-text">
                    <span className="">01.01.1900</span>
                    <Link to='#'>Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;