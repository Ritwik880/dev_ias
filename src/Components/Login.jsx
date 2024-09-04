import React, { useState } from 'react';
import { doLogin } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input fields
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            toast.error('Please fill in all fields');
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password,
        };

        // Show a loading toast while the login process is ongoing
        const toastId = toast.loading('Logging in...');

        // Perform login
        doLogin(userData, () => {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Update toast message on success
            toast.update(toastId, {
                render: 'Login successful!',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });

            // Perform any additional login-related actions
            onLogin(userData);
            navigate('/dashboard/courses');

            // Close the modal using Bootstrap's JavaScript API
            const modal = document.getElementById('loginModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            // Clear form fields
            setEmail('');
            setPassword('');
        });
    };



    return (
        <>
            <button className="btn btn-danger mx-2" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <ToastContainer autoClose={1000} />
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email2" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password2" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
