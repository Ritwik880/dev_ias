import React, {useEffect} from 'react'

//components
import Home from './Components/Home'
import Footer from './Components/Footer'
import Courses from './Components/Courses'
import Navbar from './Components/Navbar'
import CourseDetail from './Components/CourseDetail'

//react-router
import { Routes, Route } from 'react-router-dom'

//css
import './App.css'
import './Footer.css'


//data
import { COURSES as data } from './constants/data'
import PrivateRoute from './Components/PrivateRoute';
import About from './Components/Pages/About'
import Service from './Components/Pages/Service'
import Contact from './Components/Pages/Contact'

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