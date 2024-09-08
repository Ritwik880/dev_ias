import React from 'react'

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


//data
import { COURSES as data } from './constants/data'

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
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