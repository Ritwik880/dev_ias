import React, { useState } from 'react';
import { doLogin } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input fields
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }

        // Name validation (allow spaces)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            setErrors({ ...errors, name: 'Name must contain only letters and spaces' });
            return;
        }

        // Password validation (at least 8 characters, one uppercase, one lowercase, one number, one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrors({
                ...errors,
                password:
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            });
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
            // navigate('/dashboard/courses');
            toast.success('Login successfull!')

            // Close the modal using Bootstrap's JavaScript API
            const modal = document.getElementById('loginModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            window.location.reload();

            // Clear form fields
            setEmail('');
            setPassword('');
        });
    };



    return (
        <>
            <button className="btn btn-danger login-btn" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
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
                                    <label htmlFor="name" className="form-label">Name<span className='error'>*</span></label>
                                    <input type="name" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }); }} />
                                    {errors.name && <span className='error'>{errors.name}</span>}

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address<span className='error'>*</span></label>
                                    <input type="email" className="form-control" id="email2" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} />
                                    {errors.email && <span className='error'>{errors.email}</span>}

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password<span className='error'>*</span></label>
                                    <input type="password" className="form-control" id="password2" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }} />
                                    {errors.password && <span className='error'>{errors.password}</span>}

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
