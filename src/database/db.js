
//TODO: @Medede

const db = null;

/*
user = {
    id: uuid,
    vorname: string,
    nachname: string,
    email: string,
    passwort: string,
    role: string,
    profilePicture: string,
}
 */
const getUsers = () => {};
const getUser = (id) => {};
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
    likes: number,
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
