import React from 'react'

//components
import Courses from './Components/Courses'
import Navbar from './Components/Navbar'
import CourseDetail from './Components/CourseDetail'

//react-router
import { Routes, Route } from 'react-router-dom'

//css
import './App.css'

//data
import { COURSES as data } from './constants/data'
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Courses data={data}/>} />
        <Route path="/:courseId" element={<CourseDetail data={data}/>} />
      </Routes>
    </>
  )
}

export default App