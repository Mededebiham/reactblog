import React from 'react';
import {useParams} from 'react-router-dom';
import Link from "../components/parts/Link";
import {posts} from "../database/mockPostData";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";
import PostFooter from "../components/posts/PostFooter";
import Comments from "../components/Comments";

const Post = () => {

const {id} = useParams();
const post = posts.find(post => post.id === id);

const [showComments, setShowComments] = React.useState(false);
const [likeCount, setLikeCount] = React.useState(Math.floor(Math.random() * 10));
const [liked, setLiked] = React.useState(false);

const toggleComment = () => {
    setShowComments(!showComments);
}

const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
}

    return (
        <div className="m-4">
            <div className="flex flex-wrap items-center">
            <Link to="/posts" className="text-blue hover:text-yellow">
                <div className="flex items-center">
                <svg className="rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                    <p className="ml-2">Zurück zu den Beiträgen</p>
                </div>
            </Link>
            </div>
            <ul>
            <PostCard post={post} footer={false} cropped={false}>
                <PostFooter
                    postId={post.id}
                    toggleComment={() => toggleComment()}
                    toggleLike={() => toggleLike()}
                    liked={liked}
                    likeCount={likeCount}
                    className="mt-8"/>
            </PostCard>
                {showComments && <Comments comments={post.comments} />}
            </ul>
        </div>
    );
};

export default Post;