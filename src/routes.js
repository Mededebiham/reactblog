import Home from './pages/Home';
import Posts from "./pages/Posts";
import Post from "./pages/Post";


export const routes = [
    { path: '/', component: Home, name: 'Start', renderNav: true },
    { path: '/posts', component: Posts, name: 'Posts', renderNav: true },
    { path: '/posts/:id', component: Post, name: 'Post', renderNav: false },
];