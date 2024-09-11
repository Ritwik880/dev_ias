import React, { useState } from 'react';

//auth
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';

//react-router-dom
import { Link, useNavigate } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/authSlice';
import { logOut } from '../../redux/authSlice';

//firebase
import { getAuth, signOut } from 'firebase/auth';

//toast
import { toast } from 'react-toastify';

//mui
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleLogout = async () => {
        const auth = getAuth();
        setLoading(true);
        try {
            await signOut(auth);
            dispatch(logOut());
            toast.success("User logged out successfully!");
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            toast.error(`Logout failed: ${error.message}`);
        }
    };

    const handleNavigate = () => {
        navigate('/dashboard/courses');
    }

    const handleGoToCart = (id) => {
        if (!isLoggedIn) {
            toast.error('You are not logged in. Please log in to proceed with the purchase.');
        } else {
            navigate('/cart')
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/service">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        <>
                            <button className='shopping-cart' onClick={handleGoToCart}>
                                <span className='shopping-cart-item'>
                                    {cartItems ? cartItems.length : 0}
                                </span>
                                <ShoppingCartIcon fontSize='30px'/>
                            </button>
                            {isLoggedIn ? (
                                <div className='account-header'>
                                    <span className='username'>Welcome, {user.email}!</span>
                                        <button variant="contained" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    <button className="btn btn-danger" onClick={handleNavigate}>My Account</button>
                                </div>
                            ) : (
                                <div className='auth-header'>
                                    <Login />
                                    <Signup />
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
