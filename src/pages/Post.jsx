import React from 'react';
import {NavLink, useParams} from 'react-router-dom';
import Link from "../components/Link";
import {posts} from "../database/mockPostData";
import TagBadge from "../components/TagBadge";

const Post = () => {

const {id} = useParams();
const post = posts.find(post => post.id === id);

    return (
        <div className="m-4">
            <div className="flex flex-wrap items-center">
            <Link to="/posts">
                <div className="flex items-center">
                <svg className="rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                    <p className="ml-2">Back to Posts</p>
                </div>
            </Link>
                <div className="ml-6">
                {post.tags.map((tag) => (
                    <TagBadge key={tag.id} bgColor={tag.color}>
                        {tag.name}
                    </TagBadge>
                ))}
                </div>
            </div>
            <div
                className="my-4 p-6 bg-surface1 border border-overlay0 rounded-lg shadow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-text">{post.title}</h5>
                <p className="font-normal text-text">{post.content}</p>
            </div>
        </div>
    );
};

export default Post;