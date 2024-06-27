import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { posts as mockPosts, tags as tagObj } from "../database/mockPostData";
import TagPool from "../components/TagPool";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/Pagination";

const showAllTitle = 'Nach Kategorie filtern:';

const Posts = () => {
    const tagArray = Object.values(tagObj);
    const { page, tag } = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState(mockPosts);
    const [tags, setTags] = useState(tagArray);
    const [tagTitle, setTagTitle] = useState(showAllTitle);
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
    const postsPerPage = 3;

    useEffect(() => {
        setCurrentPage(parseInt(page) || 1);
    }, [page]);

    useEffect(() => {
        if (tag) {
            const tagObject = tagArray.find(t => t._id === tag);
            if (tagObject) {
                filterPosts(tagObject);
            } else {
                resetPosts();
            }
        } else {
            resetPosts();
        }
    }, [tag]);

    const filterPosts = (tag) => {
        const filteredPosts = mockPosts.filter(post => post.tags.some(mockTag => mockTag._id === tag._id));
        setPosts(filteredPosts);
        setTags([{ _id: null, name: 'Zeige alle Beiträge', color: 'bg-text' }]);
        setTagTitle(<>Zeige Beiträge mit Kategorie: <TagBadge bgColor={tag.color}>{tag.name}</TagBadge></>);
        setCurrentPage(1);
        navigate(`/posts/category/${tag._id}`);
    };

    const resetPosts = () => {
        setPosts(mockPosts);
        setTags(tagArray);
        setTagTitle(showAllTitle);
        setCurrentPage(1);
        navigate('/posts');
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
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

    const totalPages = Math.ceil(posts.length / postsPerPage);

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
