import React from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from './Tabs';
import Videos from './Sub_Courses/Videos';
import Main_Tests from './Sub_Courses/Main_Tests';
import E_Materials from './Sub_Courses/E_Materials';
const CourseDetail = () => {
    const location = useLocation()
    const course = location.state?.course;
    
    const tabsData = [
        {
            label: 'Videos',
            content: <Videos id={course.id ? course.id : 1}/>, // Replace with actual content
        },
        {
            label: 'Main Tests',
            content: <Main_Tests/>, // Replace with actual content
        },
        {
            label: 'E-Materials',
            content: <E_Materials/>, // Replace with actual content
        },
        {
            label: 'Mentor Box',
            content: <div>Mentor Box content for {course.title}</div>, // Replace with actual content
        },
    ];


    return (
        <section className='courses-section'>
            <div className='row container'>
                <div className='course-header'>
                    <h2 className='course-heading'>
                        {course.title}
                    </h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#/courses">My Courses</a></li>
                            <li className="breadcrumb-item"><a href="">{course.title}</a></li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <Tabs tabsData={tabsData}/>
                </div>
            </div>
        </section>
    )
}

export default CourseDetail