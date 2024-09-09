import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

import Select from 'react-select';

import { app } from '../../firebase';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app);

import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase(app);

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState(null);
    const [options, setOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [pincodeOptions, setPincodeOptions] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cityLoading, setCityLoading] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        city: '',
        password: '',
    });

    const handlePhoneChange = (value) => {
        const phoneWithPlus = `+${value}`;
        setPhone(phoneWithPlus);
        if (value.length > 12) {
            setErrors('Phone number cannot exceed 10 digits.');
        } else {
            setErrors('');
        }
    };

    const handleStateChange = async (selectedOption) => {
        setSelectedState(selectedOption);
        if (selectedOption) {
            await fetchCities(selectedOption.value);
        }
    };

    const fetchStates = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
                country: "India",
            });

            const states = response.data.data.states;
            const stateOptions = states.map((state) => ({ value: state.name, label: state.name }));

            setOptions(stateOptions);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            toast.error(error);
            console.error(error);
        }
    };

    const fetchCities = async (state) => {
        setCityLoading(true);
        try {
            const response = await axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
                country: "India",
                state: state,
            });

            const cities = response.data.data;
            const cityOptions = cities.map((city) => ({ value: city, label: city }));

            setCityOptions(cityOptions);
            setCityLoading(false);

        } catch (error) {
            setCityLoading(false);
            toast.error(error);
            console.error(error);
        }
    };


    const handleCityChange = async (selectedOption) => {
        setSelectedCity(selectedOption);

        if (selectedOption) {
            await fetchRespectiveCityPincode(selectedOption.value);
        }
    };

    const fetchRespectiveCityPincode = async (city) => {
        setPincodeLoading(true);
        try {
            const response = await axios.get(`https://api.postalpincode.in/postoffice/${city}`);
    
            const pinCodes = response.data[0].PostOffice.map(post => ({ value: post.Pincode, label: post.Pincode }));
            setPincodeOptions(pinCodes);
            setPincodeLoading(false);
        } catch (error) {
            setPincodeLoading(false);
            toast.error("Failed to fetch pincode.");
            console.error(error);
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = { ...errors }

        if (password !== cPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || password.trim() === '' || cPassword.trim() === '') {
            toast.error("Please fill all the fields!");
            return;
        }


        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email address.';
        }
        else {
            newErrors.email = '';
        }


        // Name validation (allow spaces)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            newErrors.name = 'Name must contain only letters and spaces.';
        }
        else {
            newErrors.name = '';
        }

        // Password validation (at least 8 characters, one uppercase, one lowercase, one number, one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        else {
            newErrors.password = '';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Set additional user data
            const userData = {
                name: name,
                city: selectedCity ? selectedCity.value : '',
                state: selectedState ? selectedState.value : '',
                phone: phone,
                zip: zip ? zip.value: '',
            };

            set(ref(db, 'users/' + uid), userData);

            toast.success("User registered successfully!");

            setName('');
            setEmail('');
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

    useEffect(() => {
        fetchStates();
    }, [])
    

    return (
        <>
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
                                            // disableDropdown={true}
                                        />
                                    </div>
                                    <div className='col-lg-6 col-md-12 mb-3'>
                                        <label htmlFor="inputState" className="form-label">State<span className='error'>*</span></label>
                                        <Select options={options} placeholder="Choose..." onChange={handleStateChange} value={selectedState} isLoading={loading}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-12 mb-3">
                                        <label htmlFor="city" className="form-label">City<span className='error'>*</span></label>
                                        <Select options={cityOptions} placeholder="Choose..." isLoading={cityLoading} isDisabled={!selectedState} onChange={handleCityChange} value={selectedCity}/>
                                    </div>
                                    <div className='col-lg-6 col-md-12 mb-3'>
                                        <label htmlFor="inputZip" className="form-label">Zip<span className='error'>*</span></label>
                                        <Select options={pincodeOptions} isDisabled={!selectedCity} placeholder="Choose..." isLoading={pincodeLoading}  value={zip} onChange={(value) => setZip(value)}/>
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-12 mb-3" style={{ position: 'relative' }}>
                                        <label htmlFor="password" className="form-label">Password<span className='error'>*</span></label>
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Password" />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                                        </button>
                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-12 mb-3" style={{ position: 'relative' }}>
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password<span className='error'>*</span></label>
                                        <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" value={cPassword} onChange={(e) => { setCPassword(e.target.value); setErrors({ ...errors, name: '' }); }} placeholder="Enter Your Password" />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showPassword state
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                                        </button>
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
