import React from 'react';
import posts from "../database/mockPostData";
import Link from "../components/Link";
import {NavLink} from "react-router-dom";



const Posts = () => {
    return (
        <>
            <ul className="m-4">
                {posts.map((post, index) => (
                    <li key={index}
                        className="my-4 p-6 bg-surface1 border border-overlay0 rounded-lg shadow">
                        <NavLink to={`/posts/${post.id}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text">{post.title}</h5>
                        </NavLink>
                        <p className="mb-3 font-normal text-text line-clamp-4">{post.content}</p>
                        <Link to={`/posts/${post.id}`}>
                            <div className="flex items-center">
                            Read more <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
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
        </>
    );
};

export default Posts;
