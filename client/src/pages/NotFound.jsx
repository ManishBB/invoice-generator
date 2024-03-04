import React from "react";
import { useLocation } from "react-router-dom";

function NotFound() {
    const location = useLocation();
    const message = location?.state;

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                color: "#474444",
                fontSize: "30px",
            }}
        >
            {message ? message : "404 | Not Found | Bad Request"}
        </div>
    );
}

export default NotFound;
