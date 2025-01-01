"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {redirect, useRouter} from "next/navigation";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    // useEffect(() => {
    //     const auth = localStorage.getItem("auth_token");
    //     if (auth) {
    //         redirect("/");
    //     }
    // }, []);

    const router = useRouter()

    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        // Password validation
        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");

        if (validateForm()) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {email, password});
                // Store the JWT token in localStorage
                localStorage.setItem("auth_token", response.data.token);

                // Redirect to the movies page after successful login
                router.push("/movies");
            } catch (error) {
                setGeneralError(error.response?.data?.message || "An error occurred");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-white">
            <div>
                {/* Sign-In Header */}
                <h1 className="text-h2 font-montserrat font-semibold text-center mb-32">
                    Sign In
                </h1>

                {/* Form Section */}
                <form className="flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="w-72">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={`w-full h-11 p-8 bg-input text-white placeholder-white rounded-[10px] border ${
                                emailError ? "border-error" : "border-transparent"
                            } focus:outline-none`}
                        />
                        {emailError && <p className="text-error text-sm mt-1">{emailError}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="w-72">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`w-full h-11 p-8 bg-input text-white placeholder-white rounded-[10px] border ${
                                passwordError ? "border-error" : "border-transparent"
                            } focus:outline-none`}
                        />
                        {passwordError && <p className="text-error text-sm mt-1">{passwordError}</p>}
                    </div>

                    {/* General Error Message */}
                    {generalError && <p className="text-error text-sm mt-2">{generalError}</p>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-72 h-11 bg-primary text-background font-semibold text-bodyRg rounded-[10px] hover:bg-green-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
