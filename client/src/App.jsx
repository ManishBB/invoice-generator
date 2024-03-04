import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductForm from "./pages/ProductForm";
import PdfPage from "./pages/PdfPage";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

function App() {
    const isUserLoggedIn =
        useSelector((state) => state.auth.status) ||
        localStorage.getItem("isLoggedIn");
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/register"
                    element={<Register />}
                    errorElement={<NotFound />}
                ></Route>
                <Route
                    path="/login"
                    element={<Login />}
                    errorElement={<NotFound />}
                ></Route>
                <Route
                    path="/"
                    element={
                        isUserLoggedIn ? (
                            <ProductForm />
                        ) : (
                            <Navigate to="login" />
                        )
                    }
                    errorElement={<NotFound />}
                ></Route>
                <Route
                    path="/invoice"
                    element={<PdfPage />}
                    errorElement={<NotFound />}
                ></Route>
                <Route
                    path="/broken"
                    element={<NotFound />}
                    errorElement={<NotFound />}
                ></Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;
