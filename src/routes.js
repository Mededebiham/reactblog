import Home from './pages/Home';
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreatePost from "./pages/CreatePost";



export const routes = [
    { path: '/', component: Home, name: 'Start', renderNav: false },
    { path: '/posts', component: Posts, name: 'Posts', renderNav: true },
    { path: '/posts/:id', component: Post, name: 'Post', renderNav: false },
    { path: '/register',component: Register, name: "Registrieren", renderNav:true },
    { path: '/login',component: Login, name: "Login", renderNav:true },
    { path: '/logout',component: Logout, name: "Logout", renderNav:true },
    { path: 'create-post', component: CreatePost, name: 'Create Post', renderNav: false },
    { path: '*', component: Home, name: '404', renderNav: false }
];