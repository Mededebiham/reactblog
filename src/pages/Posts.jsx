import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { posts as mockPosts, tags as tagObj } from "../database/mockPostData";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";

const showAllTitle = 'Nach Kategorie filtern:';

const Posts = () => {
    const tagArray = Object.values(tagObj);
    const { page } = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState(mockPosts);
    const [tags, setTags] = useState(tagArray);
    const [tagTitle, setTagTitle] = useState(showAllTitle);
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
    const postsPerPage = 3;

    useEffect(() => {
        setCurrentPage(parseInt(page) || 1);
    }, [page]);

    const filterPosts = (tag) => {
        const filteredPosts = mockPosts.filter(post => post.tags.some(mockTag => mockTag.id === tag.id));
        setPosts(filteredPosts);
        setTags([{ id: null, name: 'Zeige alle Beiträge', color: 'bg-text' }]);
        setTagTitle(<>Zeige Beiträge mit Kategorie: <TagBadge bgColor={tag.color}>{tag.name}</TagBadge></>);
        navigate('/posts');
    };

    const resetPosts = () => {
        setPosts(mockPosts);
        setTags(tagArray);
        setTagTitle(showAllTitle);
        navigate('/posts');
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        if (pageNumber === 1) {
            navigate('/posts');
        } else {
            navigate(`/posts/${pageNumber}`);
        }
    };

    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className="m-4">
            <h1 className="text-lg font-medium mx-4 mb-2">{tagTitle}</h1>
            <div className="flex flex-wrap bg-mantle p-4 rounded-xl">
                {tags.map((tag) => (
                    <TagBadge
                        onClick={tag.id ? () => filterPosts(tag) : resetPosts}
                        key={tag.id}
                        bgColor={tag.color}
                    >
                        {tag.name}
                    </TagBadge>
                ))}
            </div>
            <ul>
                {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="pagination flex">
                        <li className={`mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                className="px-3 py-1 border rounded"
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map(number => (
                            <li key={number + 1} className="mx-1">
                                <button
                                    onClick={() => paginate(number + 1)}
                                    className={`px-3 py-1 border rounded ${currentPage === number + 1 ? 'bg-surface2 text-text' : ''}`}
                                    disabled={currentPage === number + 1}
                                >
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                className="px-3 py-1 border rounded"
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Posts;
