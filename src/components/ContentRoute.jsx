import React from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes";

const ContentRoute = () => {
    return (<div>
        <Routes>
            {routes.map((route, index) => (<Route path={route.path} element={<route.component/>}/>))}
        </Routes>
    </div>);
}

export default ContentRoute;