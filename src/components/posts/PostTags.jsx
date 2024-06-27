import React from 'react';
import TagBadge from "../TagBadge";

const PostTags = ({post}) => {
    return (
        <div className="flex flex-wrap my-4">
            {post.tags && post.tags.map((tag) => (<TagBadge key={tag.id} bgColor={tag.color}>
                {tag.name}
            </TagBadge>))}
        </div>
    );
};

export default PostTags;