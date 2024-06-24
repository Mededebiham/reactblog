import Home from './pages/Home';
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Register from "./components/Register";
import Login from "./components/Login";



export const routes = [
    { path: '/', component: Home, name: 'Start', renderNav: true },
    { path: '/posts', component: Posts, name: 'Posts', renderNav: true },
    { path: '/posts/:id', component: Post, name: 'Post', renderNav: false },
    {path: '/register',component: Register, name: "Registrieren", renderNav:true},
    {path: '/login',component: Login, name: "Login", renderNav:true},
];