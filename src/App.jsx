import React, { useState, useEffect } from 'react'

//components

import Navbar from './Components/Pages/Navbar'
import Home from './Components/Pages/Home';
import About from './Components/Pages/About'
import Service from './Components/Pages/Service'
import Contact from './Components/Pages/Contact'
import Courses from './Components/Pages/Courses'
import CourseDetail from './Components/Pages/CourseDetail'
import Footer from './Components/Pages/Footer'
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

//firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/authSlice';

//colorRing
import { ColorRing } from 'react-loader-spinner';
import Nav2 from './Components/Pages/Nav2';
import GoToCart from './Components/Pages/GoToCart';


const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div className='loading-wrapper'>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>;
  }
  else {

    return (
      <>
        <Navbar />
        {/* <Nav2/> */}
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

}

export default App