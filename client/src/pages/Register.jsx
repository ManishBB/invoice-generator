import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../config/config";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle signup logic here...

        if (!name) {
            alert("Please enter your name!");
            return;
        }

        if (!email) {
            alert("Please enter your email address!");
            return;
        }

        if (!conf.emailRegex.test(email)) {
            alert("Please enter your email address correctly!");
            return;
        }

        if (!password) {
            alert("Please enter your password!");
            return;
        }

        try {
            const response = await axios.post(
                `${conf.baseUrl}/auth/register-user`,
                {
                    name,
                    email,
                    password,
                }
            );
            const { data } = response.data;

            console.log(data);

            navigate("/login");

            // Clear form
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
            alert("Something went wrong! User may exist already...");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                        />
                    </div>
                    <div className="flex items-baseline justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                        >
                            Register
                        </button>
                    </div>
                    <p
                        className="block mt-3 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Do you have an account? Login
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
