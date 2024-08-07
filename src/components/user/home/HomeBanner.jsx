import React from 'react'

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeBanner() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            {/* Hero Start */}
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">Sỉ Lẻ Trên Toàn Quốc</h4>
                            <h1 className="mb-5 display-3 text-primary">
                                Đặc Sản Của Người Việt
                            </h1>
                            {/* <div className="position-relative mx-auto">
                                <input
                                    className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                                    type="number"
                                    placeholder="Search"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                                    style={{ top: 0, right: "25%" }}
                                >
                                    Submit Now
                                </button>
                            </div> */}
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <Slider {...settings}>
                                <div className="carousel-item active rounded">
                                    <img
                                        src="https://toplist.vn/images/800px/mut-dua-583230.jpg"
                                        className="img-fluid w-100 h-100 bg-secondary rounded"
                                        alt="First slide"
                                        style={{ maxHeight: '291px', objectFit: 'cover' }}
                                    />
                                    <a href="#" className="btn px-4 py-2 text-white rounded">
                                        Mứt
                                    </a>
                                </div>
                                <div className="carousel-item rounded">
                                    <img
                                        src="https://cokhidongnam.vn/wp-content/uploads/2021/07/phuong-phap-say-nong-san-600x342.jpg"
                                        className="img-fluid w-100 h-100 rounded"
                                        alt="Second slide"
                                    />
                                    <a href="#" className="btn px-4 py-2 text-white rounded">
                                        Hạt
                                    </a>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero End */}
        </>

    )
}

export default HomeBanner