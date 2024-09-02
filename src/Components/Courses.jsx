import React from 'react'
import { useNavigate } from 'react-router-dom';
const Courses = ({data}) => {

    const navigate = useNavigate();

    const handleNavigate = (course)=>{
        navigate(`/courses/${course.id}`, {state: {course}})
    }
    return (
        <section className='courses-section'>
            <div className='row container'>
                <h1>
                    Enrolled Courses
                </h1>

                <div className='card-div'>
                    {
                        data && data.map((item) => {
                            return (
                                <div className="card" key={item.id}>
                                    <img src={item.img} className="card-img-top card-logo" alt="ias_logo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}<br /><span className="package_code"><i className="fa fa-tag"></i> {item.code}</span><span className="package_code"> <i className="fa fa-info-circle"></i>{item.mode}</span></h5>
                                        <button className="btn btn-primary" onClick={() => handleNavigate(item)}>{item.btn} <i className="fa fa-angle-double-right"></i></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Courses