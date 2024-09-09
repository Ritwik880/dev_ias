import React, { useState } from 'react';

import { toast } from 'react-toastify';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

//firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase';

//redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

const auth = getAuth(app);

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (email.trim() === '' || password.trim() === '') {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
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

        try {
            const userCredential = await
                signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = {
                accessToken: user.accessToken,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };

            toast.success('Login Successful');
            dispatch(setUser(userData));

            setEmail('');
            setPassword('');

            window.location.reload();
        } catch (error) {
            toast.error(error.message);
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <button className="common-color user-login common-padding" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address<span className='error'>*</span></label>
                                    <input type="email" className="form-control" id="email2" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} placeholder="Enter Your Email ID/Mobile" />
                                    {errors.email && <span className='error'>{errors.email}</span>}

                                </div>
                                <div className="mb-3" style={{ position: 'relative' }}>
                                    <label htmlFor="password" className="form-label">Password<span className='error'>*</span></label>
                                    <input type={showPassword ? "text" : "password"} className="form-control" id="password2" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }} placeholder="Enter Your Password" />
                                    <button
                                        type="button"
                                        className="eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {errors.password && <span className='error'>{errors.password}</span>}

                                </div>
                                <button type="submit" className="user-login common-login common-padding2">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
