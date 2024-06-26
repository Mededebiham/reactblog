import React, {useEffect, useState} from 'react';
import TagSelector from '../TagSelector';
import { tags as mockTags } from "../../database/mockPostData";
import QuillEditor  from "../QuillEditor";
import {createPost, fetchPosts} from "../../database/db";

const BlogPost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');

    const availableTags = mockTags;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = {
                author: '',
                title: 'Hallo',
                content: 'Test',
                likes: [],
                comments: [],
                tags: []
            };
            // Post erstellen
            const response = await createPost(newPost);
            addPost(newPost);
            setTitle('');
            setContent('');
            setSelectedTags([]);
            alert(response.message || 'Post erfolgreich erstellt!');


        } catch (error) {
            setError(error.message || 'Serverfehler');
        }
    };

    const medede372433 = '667c1af03545e00aa69c6401'
    const [users, setUsers] = useState([]);

    const newUser = {  _id: medede372433,
                            firstName: 'Medede',
                            lastName: 'Markus',
                            username: 'Mazlum',
                            password: '12834754',
                            role: 'mod',
                            profilePicture: 'https://randomuser.me/api/portraits'
    };

    useEffect(() => {
        const test = async () => {setUsers(await fetchPosts());}
        test();

        const test2 = async () => {await createPost({ author: newUser, title: 'Hallo', content: 'Test', likes: ['564564', '5435'], comments: ['oeuohduiho'], tags: ['uioeui'] })}
        test2().then(r => console.log(r));
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-surface0 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Neuen Beitrag erstellen</h2>
                <div className="mb-4">
                    <label className="block text-text">Titel</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-surface1 bg-surface2 rounded mt-1"
                        required
                    />
                </div>
                <div className="mb-16 h-full">
                    <label className="block text-text">Inhalt</label>
                    <QuillEditor value={content} onChange={setContent}/>
                </div>
                <TagSelector
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
                <button type="submit" className="w-full p-2 bg-blue text-base rounded hover:bg-sapphire mt-4">
                    Beitrag erstellen
                </button>
                {users.map(user => <div key={user._id}>{user._id}</div>)}
            </form>
        </>
    );
};

export default BlogPost;