import React from 'react';
import PostTags from "./PostTags";
import Link from "../parts/Link";

const PostHeader = ({post}) => {

    const post1 = {
        author: {
            name: 'Admin',
            id: 1,
        },
        date: '01.01.1900',
    }

    return (
        <div className="flex justify-between">
            <div>
                <h5 className="mb-2 text-xl font-medium tracking-tight text-text">{post.title}</h5>
                <PostTags post={post}/>
            </div>
            <div>
                <div
                    className="flex flex-col items-end text-sm justify-start pl-2 border-l-2 border-l-text">
                    <span className="">{post1.date}</span>
                    <Link to='#' className="text-blue hover:text-yellow">{post1.author.name}</Link>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;