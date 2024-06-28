import React, { useContext, useState, useEffect } from 'react';
import PostTags from "./PostTags";
import Link from "../parts/Link";
import { UserContext } from '../../context';
import { getUserById } from "../../database/db";
import { toTitleCase } from "../../utils/utils";
import UserIcon from "../logos/UserIcon";

const PostHeader = ({ post }) => {
    const { user } = useContext(UserContext);
    const [author, setAuthor] = useState(null);
    const canEdit = user.role === 'admin' || user.role === 'mod';

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const authorData = await getUserById(post.userid);
                setAuthor(authorData);
            } catch (error) {
                console.error('Error fetching author data:', error);
            }
        };

        fetchAuthor();
    }, [post.userid]);

    if (!author) return <div>Lade...</div>;

    const formattedDate = new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(post.createdAt));

    return (
        <div className="flex justify-between">
            <div className="flex-grow">
                <h5 className="mb-2 text-xl font-medium tracking-tight text-text">{post.title}</h5>
                <PostTags post={post} />
            </div>
            <div className="flex flex-col items-end ml-4 flex-shrink-0">
                <div className="flex items-center text-sm justify-start pl-2 border-l-2 border-l-surface2">
                    <Link to={`/user/${post.userid}`}>
                        <UserIcon className="w-10 h-10 rounded-full mr-2" userId={`${post.userid}`} />
                    </Link>
                    <div className="flex flex-col">
                        <span className="">{formattedDate}</span>
                        <Link to={`/user/${post.userid}`} className="text-blue hover:text-yellow">{toTitleCase(author.firstname)}</Link>
                    </div>
                </div>
                {canEdit && <Link to={`/post/edit/${post._id}`} className="text-sm text-surface0 hover:text-yellow mt-1">Bearbeiten</Link>}
            </div>
        </div>
    );
};

export default PostHeader;
