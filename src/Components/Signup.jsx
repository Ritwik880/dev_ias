import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

import { STATE as state } from '../constants/data';

import Select from 'react-select';

import { app } from '../firebase';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app);

import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase(app);

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        city: '',
        zip: '',
        password: '',
    });

    const options = state.map(state => ({ value: state.name, label: state.name }));


    const handlePhoneChange = (value) => {
        const phoneWithPlus = `+${value}`;
        setPhone(phoneWithPlus);
        if (value.length > 12) {
            setErrors('Phone number cannot exceed 10 digits.');
        } else {
            setErrors('');
        }
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== cPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (name.trim() == '' || email.trim() == '' || phone.trim() == '' || city.trim() == '' || selectedState.value.trim() == '' || zip.trim() == '' || password.trim() == '' || cPassword.trim() == '') {
            toast.error("Please fill all the fields!");
            return;
        }


        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address.' });
            return;
        }

        // 2. City validation
        const cityRegex = /^[a-zA-Z0-9\s]+$/;
        if (!cityRegex.test(city)) {
            setErrors({ ...errors, city: 'Invalid city name.' });
            return;
        }

        // 3. ZIP code validation
        const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (!zipRegex.test(zip)) {
            setErrors({ ...errors, zip: 'Invalid ZIP code.' });
            return;
        }

        // Name validation (allow spaces)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            setErrors({ ...errors, name: 'Name must contain only letters and spaces.' });
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Set additional user data
            const userData = {
                name: name,
                city: city,
                state: selectedState ? selectedState.value : '',
                phone: phone,
                zip: zip,
            };

            set(ref(db, 'users/' + uid), userData);

            toast.success("User registered successfully!");

            setName('');
            setEmail('');
            setCity('');
            setZip('');
            setPassword('');
            setCPassword('');

            const modal = document.getElementById('signupModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
        } catch (error) {
            toast.error(error.message);
            console.error('Error appending data:', error);
        }
    };

    return (
        <>
            <ToastContainer autoClose={1000} />
            <button className="common-color user-login common-padding signup" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Signup</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="name" className="form-label">Full Name<span className='error'>*</span></label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Full Name" />
                                        {errors.name && <span className='error'>{errors.name}</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="email" className="form-label">Email address<span className='error'>*</span></label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Email" />
                                        {errors.email && <span className='error'>{errors.email}</span>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-12 mb-3'>
                                        <label htmlFor="email" className="form-label">Phone Number<span className='error'>*</span></label>
                                        <PhoneInput
                                            country={'in'}
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            placeholder='Enter Your Mobile No'
                                            disableDropdown={true}
                                        />
                                    </div>
                                    <div className='col-lg-6 col-md-12 mb-3'>
                                        <label htmlFor="inputState" className="form-label">State<span className='error'>*</span></label>
                                        <Select options={options} placeholder="Choose..." onChange={handleStateChange} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="city" className="form-label">City<span className='error'>*</span></label>
                                        <input type="city" className="form-control" id="city" value={city} onChange={(e) => { setCity(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your City" />
                                        {errors.city && <span className='error'>{errors.city}</span>}
                                    </div>
                                    <div className='col-lg-6 col-md-12 mb-3'>
                                        <label htmlFor="inputZip" className="form-label">Zip<span className='error'>*</span></label>
                                        <input type="text" className="form-control" id="inputZip" placeholder='828127' value={zip} onChange={(e) => { setZip(e.target.value); setErrors({ ...errors, name: '' }); }} inputMode="numeric" />
                                        {errors.zip && <span className='error'>{errors.zip}</span>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="password" className="form-label">Password<span className='error'>*</span></label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Password" />
                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password<span className='error'>*</span></label>
                                        <input type="password" className="form-control" id="confirmPassword" value={cPassword} onChange={(e) => { setCPassword(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Password" />
                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                </div>
                                <button type="submit" className="user-login common-login common-padding2">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
