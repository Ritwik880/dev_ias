import React from 'react'

//components
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
import Home from './Components/Home'
import Footer from './Components/Footer'
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/courses" element={<Courses data={data}/>} />
        <Route path="/courses/:courseId" element={<CourseDetail data={data}/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App