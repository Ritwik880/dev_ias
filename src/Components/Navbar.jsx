import React, {useState, useEffect} from 'react'
import Login from './Login';
import Signup from './Signup';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
const Navbar = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined);

    useEffect(() => {
      setLogin(isLoggedIn());
      setUser(getCurrentUserDetail())
    }, [login])
    

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        // setUser(null);
        doLogout(()=>{
            setLogin(false);
            navigate('/')
        })
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
                        {login ? (
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