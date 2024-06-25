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
                        <div className="flex justify-between">
                            <div>
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
                            </div>
                        <div>
                            <div className="flex flex-col items-end text-sm justify-start pl-2 border-l-2 border-l-text">
                                <span className="">01.01.1900</span>
                                <Link to='#'>Admin</Link>
                            </div>
                        </div>
                        </div>
                        <p className="mb-3 font-normal text-text line-clamp-4">{post.content}</p>

                        <Link to={`/posts/${post.id}`}>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <div className="flex"><strong className="pr-1">5</strong>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="pl-4 flex"><strong className="pr-1">17</strong>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                          <path fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            <div className="flex items-center justify-end">
                                Mehr lesen
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </div>
                                </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;