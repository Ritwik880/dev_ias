import React, { useEffect } from 'react'

//components
import Navbar from './Components/Pages/Navbar'
import Home from './Components/Pages/Home';
import About from './Components/Pages/About'
import Service from './Components/Pages/Service'
import Contact from './Components/Pages/Contact'
import Courses from './Components/Pages/Courses'
import CourseDetail from './Components/Pages/CourseDetail'
import Footer from './Components/Pages/Footer'
import GoToCart from './Components/Pages/GoToCart';
import PrivateRoute from './Components/Authentication/PrivateRoute'

//react-router
import { Routes, Route } from 'react-router-dom'

//css
import './css/App.css';
import './css/Footer.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//data
import { COURSES as data } from './constants/data';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromRTDB, clearCartAndSync } from './redux/authSlice';


const App = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchCartFromRTDB(user.uid));
    } else {
      dispatch(clearCartAndSync());
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='cart' element={<GoToCart />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='courses' element={<Courses data={data} />} />
          <Route path="courses/:courseId" element={<CourseDetail data={data} />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )


}

export default App