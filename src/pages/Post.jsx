import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Link from "../components/parts/Link";
import { getPostById, getTags } from "../database/db";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";
import PostFooter from "../components/posts/PostFooter";
import Comments from "../components/Comments";

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchPostAndTags = async () => {
            try {
                const fetchedTags = await getTags();
                setTags(fetchedTags);

                const fetchedPost = await getPostById(id);
                const postWithTags = {
                    ...fetchedPost,
                    tags: fetchedPost.tags.map(tagId => fetchedTags.find(tag => tag._id === tagId))
                };
                setPost(postWithTags);
                setLikeCount(postWithTags.likes.length); // Initialize like count
            } catch (error) {
                console.error('Error fetching post and tags:', error);
                navigate('/posts'); // Redirect if post is not found
            }
        };

        fetchPostAndTags();
    }, [id, navigate]);

    const toggleComment = () => {
        setShowComments(!showComments);
    }

    const toggleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }

    if (!post) return <div>Loading...</div>;

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
                        postId={post._id}
                        toggleComment={toggleComment}
                        toggleLike={toggleLike}
                        liked={liked}
                        likeCount={likeCount}
                        className="mt-8"
                    />
                </PostCard>
                {showComments && <Comments comments={post.comments} />}
            </ul>
        </div>
    );
};

export default Post;
