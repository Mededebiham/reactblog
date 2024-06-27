import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, getTags } from "../database/db";
import TagPool from "../components/TagPool";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/Pagination";

const showAllTitle = 'Nach Kategorie filtern:';

const Posts = () => {
    const { page, tag } = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagTitle, setTagTitle] = useState(showAllTitle);
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
    const postsPerPage = 3;

    useEffect(() => {
        const fetchTagsAndPosts = async () => {
            try {
                const [fetchedTags, fetchedPosts] = await Promise.all([getTags(), getPosts()]);

                setTags(fetchedTags);
                const postsWithTags = fetchedPosts.map(post => ({
                    ...post,
                    tags: post.tags.map(tagId => fetchedTags.find(tag => tag._id === tagId))
                }));
                setPosts(postsWithTags);
                setFilteredPosts(postsWithTags); // Initially, all posts are shown
            } catch (error) {
                console.error('Error fetching tags and posts:', error);
            }
        };

        fetchTagsAndPosts();
    }, []);

    useEffect(() => {
        setCurrentPage(parseInt(page) || 1);
    }, [page]);

    useEffect(() => {
        if (tag && tags.length > 0) {
            const tagObject = tags.find(t => t._id === tag);
            if (tagObject) {
                filterPosts(tagObject);
            } else {
                resetPosts();
            }
        } else {
            resetPosts();
        }
    }, [tag, tags]);

    const filterPosts = (tag) => {
        const filtered = posts.filter(post => post.tags.some(t => t && t._id === tag._id));
        setFilteredPosts(filtered);
        setTagTitle(<div className="flex items-center">Zeige Beiträge mit Kategorie: <TagBadge className="ml-4 flex items-center" onClick={resetPosts} bgColor={tag.color}>{tag.name}
            <svg className="w-6 h-4 text-base" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
        </TagBadge></div>);
        setCurrentPage(1);
        navigate(`/posts/category/${tag._id}`);
    };

    const resetPosts = () => {
        setFilteredPosts(posts);
        setTagTitle(showAllTitle);
        setCurrentPage(1);
        navigate('/posts');
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber === 1) {
            if (tag) {
                navigate(`/posts/category/${tag}`);
            } else {
                navigate('/posts');
            }
        } else {
            if (tag) {
                navigate(`/posts/category/${tag}/${pageNumber}`);
            } else {
                navigate(`/posts/${pageNumber}`);
            }
        }
    };

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div className="m-4">
            <h1 className="text-lg font-medium mx-4 mb-2">{tagTitle}</h1>
            <TagPool
                tags={tags}
                onClick={filterPosts}
                onClickReset={resetPosts}
            />
            <ul>
                {currentPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Posts;
