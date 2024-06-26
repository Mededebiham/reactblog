
//TODO: @Medede

import {serverPort} from "../serverConfig";

const dbUrl = `http://localhost:5000`;

const dbGetter = async (slug) => {
    try {
        const response = await fetch(dbUrl + slug);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
    }
}


/*
user = {
    id: uuid,
    vorname: string,
    nachname: string,
    email: string,
    passwort: string,
    role: string,
    profilePicture: string,
    likes: postId[],
}
 */
const getUsers = async () => {
    return await dbGetter('/users');
};

const getUser = (id) => {
    return dbGetter(`/users/${id}`);
};
const createUser = (user) => {};
const updateUser = (user) => {};
const deleteUser = (id) => {};

/*
post = {
    id: uuid,
    title: string,
    content: string,
    date: date,
    author: user,
    category: category[],
    comment: comment[],
    likes: userId[],
}
 */
const getPosts = () => {};
const getPost = (id) => {};
const createPost = (post) => {};
const updatePost = (post) => {};
const deletePost = (id) => {};

/*
comment = {
    id: uuid,
    postId: uuid,
    content: string,
    date: date,
    author: user,
}
 */
const getComments = () => {};
const getComment = (id) => {};
const createComment = (comment) => {};
const updateComment = (comment) => {};
const deleteComment = (id) => {};

/*
tag = {
    id: uuid,
    name: string,
    color: string,
}
 */
const getTags = () => {};
const getTag = (id) => {};
const createTag = (tag) => {};
const updateTag = (tag) => {};
const deleteTag = (id) => {};

export { getUsers, getUser, createUser, updateUser, deleteUser, getPosts, getPost, createPost, updatePost, deletePost, getComments, getComment, createComment, updateComment, deleteComment, getTags, getTag, createTag, updateTag, deleteTag };