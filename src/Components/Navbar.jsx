import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        // localStorage.removeItem('user');
    };
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
                            <Link className="nav-link" to="/dashboard/courses">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contact Us</Link>
                        </li>
                    </ul>
                    <div>
                        {user ? (
                            <>
                                <span className='username'>Welcome, {user.name}!</span>
                                <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Login onLogin={handleLogin} />
                                <Signup />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar