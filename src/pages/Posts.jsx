import React, {useState} from 'react';
import {posts as mockPosts, tags as tagObj} from "../database/mockPostData";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";

const Posts = () => {
    const tagArray = Object.values(tagObj);

    const [posts, setPosts] = useState(mockPosts);
    const [tags, setTags] = useState(tagArray);

    const filterPosts = (tagId) => {
        const filteredPosts = mockPosts.filter(post => post.tags.some(tag => tag.id === tagId));
        setPosts(filteredPosts);
        setTags([{id: null, name: 'Show All Posts', color: 'bg-text'}]);
    };

    const resetPosts = () => {
        setPosts(mockPosts);
        setTags(tagArray);
    };

    return (<div className="m-4">
        <div className="flex flex-wrap">
            {tags.map((tag) => (<TagBadge
                onClick={tag.id ? () => filterPosts(tag.id) : resetPosts}
                key={tag.id}
                bgColor={tag.color}
            >
                {tag.name}
            </TagBadge>))}
        </div>
        <ul>
            {posts.map((post) => (<PostCard post={post}/>))}
        </ul>
    </div>);
};

export default Posts;