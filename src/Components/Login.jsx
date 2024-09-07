import React, { useState } from 'react';


import { doLogin } from '../auth';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
    });

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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

        const toastId = toast.loading('Logging in...');

        doLogin(userData, () => {
            localStorage.setItem('user', JSON.stringify(userData));

            toast.update(toastId, {
                render: 'Login successful!',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });

            onLogin(userData);
            toast.success('Login successfull!')

            const modal = document.getElementById('loginModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            window.location.reload();

            setEmail('');
            setPassword('');
        });
    };

    const handlePhoneChange = (value) => {
        const phoneWithPlus = `+${value}`;
        setPhone(phoneWithPlus);
        console.log(phoneWithPlus);
    
        if (value.length > 12) {
            setErrors('Phone number cannot exceed 10 digits.');
        } else {
            setErrors('');
        }
    };
    

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!phone.startsWith('+')) {
            toast.error("Invalid phone number format");
            return;
        }
        try {
            const reCaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, phone, reCaptcha);
            setConfirmationResult(confirmation);
            setIsOtpSent(true);
            console.log(confirmation);
        } catch (error) {
            console.error("Error in sending OTP:", error);
            toast.error('Failed to send OTP. Please check your phone number.');
        }
    };
    

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const data = await confirmationResult.confirm(otp);
            console.log(data);
            
        } catch (error) {
            console.error(error);
            
        }
    }



        return (
            <>
                <button className="common-color user-login common-padding" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <ToastContainer autoClose={1000} />
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <ul class="nav nav-tabs" style={{ gap: '4px' }}>
                                    <li class="login_li"><button data-toggle="tab" className={`login_tab ${activeTab === 'home' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('home')}>Using
                                        OTP</button></li> &nbsp;
                                    <li class="login_li"><button data-toggle="tab" className={`login_tab ${activeTab === 'menu1' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('menu1')}>Using
                                        Password</button></li>
                                </ul>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div class="tab-content">
                                    <div id="home" className={`tab-pane ${activeTab === 'home' ? 'active' : ''}`}>
                                        {
                                            !isOtpSent ? (
                                                <form onSubmit={handleSendOtp}>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Phone Number<span className='error'>*</span></label>
                                                        <PhoneInput
                                                            country={'in'}
                                                            value={phone}
                                                            onChange={handlePhoneChange}
                                                            placeholder='Enter Your Mobile No'
                                                            disableDropdown={true}
                                                        />
                                                    </div>
                                                    <button type="submit" className="user-login common-login common-padding2">Get OTP</button>
                                                    <div id="recaptcha"></div>

                                                </form>
                                            ) : (
                                                <form onSubmit={handleVerifyOtp}>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Enter OTP<span className='error'>*</span></label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter OTP"
                                                            value={otp}
                                                            onChange={(e) => setOtp(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit" className="user-login common-login common-padding2">Verify OTP</button>
                                                </form>
                                            )
                                        }
                                    </div>
                                    <div id="menu1" className={`tab-pane ${activeTab === 'menu1' ? 'active' : ''}`}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name<span className='error'>*</span></label>
                                                <input type="name" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Name" />
                                                {errors.name && <span className='error'>{errors.name}</span>}

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email address<span className='error'>*</span></label>
                                                <input type="email" className="form-control" id="email2" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} placeholder="Enter Your Email ID/Mobile" />
                                                {errors.email && <span className='error'>{errors.email}</span>}

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password<span className='error'>*</span></label>
                                                <input type="password" className="form-control" id="password2" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }} placeholder="Enter Your Password" />
                                                {errors.password && <span className='error'>{errors.password}</span>}

                                            </div>
                                            <button type="submit" className="user-login common-login common-padding2">Login</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    export default Login;
