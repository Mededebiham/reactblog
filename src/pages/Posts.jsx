import React, { useState } from 'react';
import { posts as mockPosts, tags as tagObj } from "../database/mockPostData";
import Link from "../components/Link";
import TagBadge from "../components/TagBadge";
import { NavLink } from "react-router-dom";

const Posts = () => {
    const tagArray = Object.values(tagObj);

    const [posts, setPosts] = useState(mockPosts);
    const [tags, setTags] = useState(tagArray);

    const filterPosts = (tagId) => {
        const filteredPosts = mockPosts.filter(post => post.tags.some(tag => tag.id === tagId));
        setPosts(filteredPosts);
        setTags([{ id: null, name: 'Show All Posts', color: 'bg-text' }]);
    };

    const resetPosts = () => {
        setPosts(mockPosts);
        setTags(tagArray);
    };

    return (
        <div className="m-4">
            <div className="flex flex-wrap">
                {tags.map((tag) => (
                    <TagBadge
                        onClick={tag.id ? () => filterPosts(tag.id) : resetPosts}
                        key={tag.id}
                        bgColor={tag.color}
                    >
                        {tag.name}
                    </TagBadge>
                ))}
            </div>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}
                        className="my-4 p-6 bg-surface1 border border-overlay0 rounded-lg shadow">
                        <NavLink to={`/posts/${post.id}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text">{post.title}</h5>
                        </NavLink>
                        <div className="flex flex-wrap my-4">
                            {post.tags.map((tag) => (
                                <TagBadge key={tag.id} bgColor={tag.color}>
                                    {tag.name}
                                </TagBadge>
                            ))}
                        </div>
                        <p className="mb-3 font-normal text-text line-clamp-4">{post.content}</p>

                        <Link to={`/posts/${post.id}`}>
                            <div className="flex items-center">
                                Mehr lesen
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
