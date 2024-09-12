import React from 'react';

import { toast } from 'react-toastify';
import { CARDS as data } from '../../constants/data';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (id) => {
        if (!isLoggedIn) {
            toast.error('You are not logged in. Please log in to proceed with the purchase.');
        } else {
            const courseToBuy = data.find(course => course.id === id);
            console.log(courseToBuy);

            const isCourseInCart = cartItems.some(cartItem => cartItem.id === id);

            if (isCourseInCart) {
                toast.info('Course already in cart. Redirecting to cart...');

                setTimeout(() => {
                    navigate('/cart')
                }, 1000);
            }
            else {
                if (courseToBuy) {
                    dispatch(addToCart(courseToBuy));
                    console.log('Proceeding with course purchase...');
                    toast.success('Course added successfully!');
                } else {
                    toast.error('Course not found!');
                    console.error('Course not found:', id);
                }
            }

        }
    };
    return (
        <>
            <section className='banner'>
                <div className='container row'>
                    <div className='col-lg-8 col-md-12'>
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://uploads.iasscore.in/banner/1725093051-9e5be57b-9274-46dc-92dd-6e344c78fae3.webp.webp" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://uploads.iasscore.in/banner/1725086161-d6ec1c36-8663-4f69-baef-03ea2c7fdbec.webp.webp" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://uploads.iasscore.in/banner/1725098552-0e253b4f-a001-4b14-96e8-d5ee9b645758.webp.webp" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="colFluidPadding">
                            <div className="stiker">
                                <a href="#">
                                    <img src="https://uploads.iasscore.in/banner/1716555021-toppers-story.webp" className="stickerImage" alt="UPSC IAS Toppers Story" />
                                </a>
                                <a href="#">
                                    <img src="https://uploads.iasscore.in/banner/1716555109-toppers-strategy.webp" className="stickerImage" alt="UPSC IAS Toppers Strategy" />
                                </a>
                                <a href="#">
                                    <img src="https://uploads.iasscore.in/banner/1716555247-toppers-copy.webp" className="stickerImage" alt="UPSC IAS Toppers Copy" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='about'>
                <div className='row container'>
                    <h3 className='about-heading'>
                        GS SCORE Courses
                    </h3>
                    <p className="aboutcoaching">
                        We at <b>COACHING NAME</b> provide TEST SERIES ONLINE. We provide test series for <b>NEET, JEE (MAINS & ADVANCE) & OTHER EXAMS LIKE WBJEE, COMED-K AND SO ON</b>. These test series are mix of informative and interactive mentorship, comprehensive study material and Tests in line with the demand of the exam. Modular Courses have always been our strength especially in <b>NEET AND JEE exams</b>. To provide all round development we provide 2 types of test series  - <b>one for mocks</b> during just before examination and other for <b>complete preparation through test series chapter wise</b>, subject wise and including mocks.
                    </p>
                    <div className="container-ias">
                        <div className="text-center toppers_ad_pc">
                            <img src="https://uploads.iasscore.in/banner/1717667482-SIDDHARTHA-SRIVASTAVA_930X180.png.webp" className="img-fluid" />
                        </div>
                        <div className="text-center toppers_ad_mobile">
                            <img src="https://uploads.iasscore.in/banner/1716369948-TOPPERS_335X272_G.-Mobile.webp	" className="img-fluid" />
                        </div>
                    </div>
                    <div className='row'>
                        {
                            data && data.map((item) => {
                                const isCourseInCart = cartItems.some(cartItem => cartItem.id === item.id)
                                return (
                                    <div className='col-lg-4 col-md-12' key={item.id}>
                                        <div className="card scheduled-classes">
                                            <img src={item.img} className="card-img-top scheduled-card" alt={item.id} />
                                            <div className="card-body">
                                                <h6 className="eachBatchStart">Batch Starts: <span className="eachDate">18th September, 2024</span> </h6>
                                                <h5 className="card-title eachSubTitle">
                                                    {item.title}
                                                </h5>
                                                <div className="course_btn">
                                                    <button className={`btn ${isCourseInCart ? 'btn-outline-primary' : 'btn-danger'}`} onClick={() => handleAddToCart(item.id)}>
                                                        {isCourseInCart ? 'Go to Cart' : 'Add to Cart'}
                                                    </button>
                                                    <span className='price-tag'>{item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home