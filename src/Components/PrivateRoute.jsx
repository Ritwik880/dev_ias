import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    let loggedIn = false;

    if (loggedIn) {
        return <Outlet />
    }
    else {
        return <Navigate to={'/'} />
    }
}

export default PrivateRoute