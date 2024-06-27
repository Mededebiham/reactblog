import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Link from "../components/parts/Link";
import { getPostById, getTags, updatePost } from "../database/db";
import PostCard from "../components/posts/PostCard";
import PostFooter from "../components/posts/PostFooter";
import Comments from "../components/Comments";
import { UserContext } from "../context";
import PostsFooter from "../components/posts/PostsFooter";

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

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
                setLiked(fetchedPost.likes.includes(user._id)); // Check if user has already liked the post
            } catch (error) {
                console.error('Error fetching post and tags:', error);
                navigate('/posts'); // Redirect if post is not found
            }
        };

        fetchPostAndTags();
    }, [id, navigate, user._id]);

    const toggleComment = () => {
        setShowComments(!showComments);
    }

    const toggleLike = async () => {
        if (!user._id) return; // Do nothing if the user is not logged in

        try {
            let updatedLikes;
            if (liked) {
                updatedLikes = post.likes.filter(userId => userId !== user._id);
                setLikeCount(likeCount - 1);
            } else {
                updatedLikes = [...post.likes, user._id];
                setLikeCount(likeCount + 1);
            }

            const updatedPost = {
                ...post,
                likes: updatedLikes
            };

            await updatePost(updatedPost);
            setPost(updatedPost);
            setLiked(!liked);
        } catch (error) {
            console.error('Error updating post likes:', error);
        }
    }

    if (!post) return <div>Lade...</div>;

    return (
        <div className="m-4 w-full">
            <div className="flex flex-wrap items-center">
                <Link to="/posts" className="text-blue hover:text-yellow">
                    <div className="flex items-center">
                        <svg className="rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <p className="ml-2">Zurück zu den Beiträgen</p>
                    </div>
                </Link>
            </div>
            <ul>
                <PostCard post={post} footer={false} cropped={false}>
                    {user._id ? (
                        <PostFooter
                            postId={post._id}
                            toggleComment={toggleComment}
                            toggleLike={toggleLike}
                            liked={liked}
                            likeCount={likeCount}
                            className="mt-8"
                        />
                    ) : <PostsFooter post={post} hideReadMore={true} />}
                </PostCard>
                {showComments && <Comments comments={post.comments} />}
            </ul>
        </div>
    );
};

export default Post;
