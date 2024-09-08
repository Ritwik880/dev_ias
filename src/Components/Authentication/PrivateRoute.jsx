import React from 'react'

import { Navigate, Outlet } from 'react-router-dom';

import { isLoggedIn } from '../../auth';

const PrivateRoute = () => {
    return isLoggedIn() ? <Outlet/> : <Navigate to={'/'}/>
}

export default PrivateRoute