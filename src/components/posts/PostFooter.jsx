import React from 'react';
import CommentCounter from "./CommentCounter";
import LikesCounter from "./LikesCounter";
import Link from "../Link";

const PostFooter = ({postId}) => {
    return (
        <div className="flex justify-between">
            <div className="flex">
                <CommentCounter postId={postId}/>
                <LikesCounter likes={postId}/>
            </div>
            <Link to={`/posts/${postId}`}>
                <div className="flex items-center justify-end">
                    Mehr lesen
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default PostFooter;