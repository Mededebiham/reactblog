import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const ContentRoute = () => {
    return (
        <div className="flex justify-center mx-auto max-w-5xl mt-2 h-full overflow-y-auto">
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </div>
    );
}

export default ContentRoute;
