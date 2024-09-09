import React from 'react'

//react-router-dom
import { Navigate, Outlet } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ? <Outlet/> : <Navigate to={'/'}/>
}

export default PrivateRoute