import Home from './pages/Home';
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CreatePost from "./pages/CreatePost";
import Error404 from "./pages/404";
import Settings from "./pages/Settings";


export const routes = [

    { path: '/', component: Home, name: 'Start', renderNav: false, userRole: null },
    { path: '/posts', component: Posts, name: 'Beiträge', renderNav: true, userRole: null },
    { path: '/posts/category/:tag', component: Posts, name: 'Beiträge', renderNav: true, userRole: null },
    { path: '/posts/:page', component: Posts, name: 'Beiträge', renderNav: true, userRole: null},
    { path: '/post/:id', component: Post, name: 'Post', renderNav: false, userRole: null },
    { path: '/register',component: Register, name: "Registrieren", renderNav: false, userRole: null },
    { path: '/login',component: Login, name: "Einloggen", renderNav: false, userRole: null },
    { path: '/logout',component: Logout, name: "Ausloggen", renderNav: false, userRole: null },
    { path: '/create-post', component: CreatePost, name: 'Beitrag erstellen', renderNav: true, userRole: 'admin' },
    { path: '/settings', component: Settings, name: 'Einstellungen', renderNav: false, userRole: 'user' },
    { path: '*', component: Error404, name: '404', renderNav: false, userRole: null }

];

export default routes;