import React from 'react'
import { FaUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { VIDEOS as data } from '../../constants/data';
import { VIDEOS2 as data2 } from '../../constants/data';
const Videos = ({ id }) => {
    return (
        <div className="row">
            {
                id == 1 ? (
                    <>
                        {
                            data && data.map((item) => {
                                return (
                                    <div className="col-md-4 mb-4" key={item.id}>
                                        <div className="card">
                                            <div className="card-outer">
                                                <div className="card-image-div">
                                                    <img src={item.img} className="image-height-width" alt="image_logo" />
                                                </div>
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title video-title">{item.title}</h5>
                                                        <p className="card-text"><FaUser /> {item.user}</p>
                                                        <p className="card-text"><CiCalendarDate /> {item.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <>
                        {
                            data2 && data2.map((item) => {
                                return (
                                    <div className="col-md-4 mb-4" key={item.id}>
                                        <div className="card">
                                            <div className="card-outer">
                                                <div className="card-image-div">
                                                    <img src={item.img} className="image-height-width" alt="image_logo" />
                                                </div>
                                                <div>
                                                    <div className="card-body">
                                                        <h5 className="card-title video-title">{item.title}</h5>
                                                        <p className="card-text"><FaUser /> {item.user}</p>
                                                        <p className="card-text"><CiCalendarDate /> {item.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default Videos