import React, { useState, useEffect } from 'react';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(isLoggedIn());
    const [user, setUser] = useState(getCurrentUserDetail());

    useEffect(() => {
        if (login) {
            setUser(getCurrentUserDetail());
        } else {
            setUser(undefined);
        }
    }, [login]);

    const handleLogin = (userData) => {
        setUser(userData);
        setLogin(true);
    };

    const handleLogout = () => {
        doLogout(() => {
            setLogin(false);
            setUser(undefined);
            navigate('/');
        });
    };

    const handleNavigate = () =>{
        navigate('/dashboard/courses');
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">IAS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contact Us</Link>
                        </li>
                    </ul>
                    <div>
                        {login ? (
                            <div className='account-header'>
                                <span className='username'>Welcome, {user?.name}!</span>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                <button className="btn btn-danger" onClick={handleNavigate}>My Account</button>
                            </div>
                        ) : (
                            <>
                                <Login onLogin={handleLogin} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
