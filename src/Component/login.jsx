import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/login.css";

const Login = ({ setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "https://backend-capable.vercel.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );

            if (response.ok) {
                const { token } = await response.json();

                // Store the token in localStorage
                localStorage.setItem("token", token);

                // Successful login
                console.log("Login successful");
                setLoggedIn(true);
                window.alert("Login successful!");

                // Navigate to the home page (replace '/home' with your desired home route)
                navigate("/");
            } else {
                // Unsuccessful login
                console.error("Login failed");
                window.alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            window.alert("Error during login. Please try again later.");
        }
    };

    const closeModals = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };

    return (
        <div>
            <section className="login d-flex">
                <div className="login-left w-50 h-100 ">
                    <div
                        className="row justify-content-center
                    mt-5"
                    >
                        <div className="col-6">
                            <div className="header">
                                <h2>Welcome Back</h2>
                                <p>Log in to your account</p>
                            </div>

                            <div className="login-form">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label for="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="email"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="btn-signin"
                                onClick={handleLogin}
                            >
                                Sign In
                            </button>

                            <div class="action-links or-text">
                                <span>
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-decoration-none"
                                    >
                                        Register Now
                                    </Link>
                                </span>
                                <br />
                                <a href="#" className="text-decoration-none">
                                    Forgot Password
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-right w-50 h-100">
                    <img src="asset/ikon-anak.png" alt="" />
                </div>
            </section>
        </div>
    );
};

export default Login;
