import React, {useState} from 'react';
import {posts as mockPosts, tags as tagObj} from "../database/mockPostData";
import TagBadge from "../components/TagBadge";
import PostCard from "../components/posts/PostCard";

const showAllTitle = 'Nach Kategorie filtern:'

const Posts = () => {
    const tagArray = Object.values(tagObj);

    const [posts, setPosts] = useState(mockPosts);
    const [tags, setTags] = useState(tagArray);
    const [tagTitle, setTagTitle] = useState(showAllTitle);

    const filterPosts = (tag) => {
        const filteredPosts = mockPosts.filter(post => post.tags.some(mockTag => mockTag.id === tag.id));
        setPosts(filteredPosts);
        setTags([{id: null, name: 'Zeige alle Beiträge', color: 'bg-text'}]);
        setTagTitle(<>Zeige Beiträge mit Kategorie: <TagBadge bgColor={tag.color}>{tag.name}</TagBadge></>);
    };

    const resetPosts = () => {
        setPosts(mockPosts);
        setTags(tagArray);
        setTagTitle(showAllTitle);
    };

    return (<div className="m-4">
            <h1 className="text-lg font-medium mx-4 mb-2">{tagTitle}</h1>
            <div className="flex flex-wrap bg-mantle p-4 rounded-xl">
                {tags.map((tag) => (<TagBadge
                        onClick={tag.id ? () => filterPosts(tag) : resetPosts}
                        key={tag.id}
                        bgColor={tag.color}
                    >
                        {tag.name}
                    </TagBadge>))}
            </div>
            <ul>
                {posts.map((post) => (<PostCard key={post.id} post={post}/>))}
            </ul>
        </div>);
};

export default Posts;
