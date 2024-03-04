import React from "react";
import { useLocation } from "react-router-dom";

function NotFound() {
    const location = useLocation();
    const message = location?.state;

    return (
        <div className="w-screen h-screen flex justify-center items-center text-center text-gray-700 text-2xl">
            {message ? message : "404 | Not Found | Bad Request"}
        </div>
    );
}

export default NotFound;
