import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="#">IAS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dev_ias/">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dev_ias/courses">Courses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dev_ias/">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dev_ias/">Contact Us</a>
                        </li>
                    </ul>
                    <button className="btn btn-danger mx-2" type="submit">Login</button>
                    <button className="btn btn-danger" type="submit">Sign Up</button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar