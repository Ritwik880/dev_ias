import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../../css/Navbar.css';
import { IconContext } from 'react-icons';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';

import LoadingButton from '@mui/lab/LoadingButton';


const Nav2 = () => {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => {
        setSideBar(!sideBar)
    }
    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSideBar} />
                </Link>
                <div className='auth-header'>
                    <Login />
                    <Signup />
                </div>
            </div>
            <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to='/' className='menu-bars'>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to='/about' className='menu-bars'>
                            <span>About Us</span>
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to='/service' className='menu-bars'>
                            <span>Services</span>
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to='/contact' className='menu-bars'>
                            <span>Contact Us</span>
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <LoadingButton loading loadingPosition="start" variant='contained'>
                            Logout
                        </LoadingButton>
                    </li>

                </ul>
            </nav>
        </IconContext.Provider>

    )
}

export default Nav2