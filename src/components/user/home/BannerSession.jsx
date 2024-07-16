import React from 'react'

function BannerSession() {
    return (
        <>
            {/* Banner Section Start*/}
            <div className="container-fluid banner bg-secondary" style={{}}>
                <div className="container py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="py-4">
                                <h1 className="display-3 text-white">Mai Quỳnh Đặc Sản Đà Lạt</h1>
                                <p className="fw-normal display-3 text-dark mb-4">
                                    Chuyên: Đặc sản Đà Lạt, Hoa Quả sấy khô, mứt...
                                </p>
                                <p className="mb-4 text-dark">
                                    Trong lòng Thành phố ngàn hoa của Đà Lạt, một điểm đến không thể
                                    bỏ qua đối với những ai yêu thích và muốn khám phá vẻ đẹp của đặc
                                    sản địa phương chính là cửa hàng Đặc Sản Mai Quỳnh Đà Lạt. Với cam
                                    kết mang đến những sản phẩm chất lượng và độc đáo, chúng tôi tự
                                    hào là điểm đến lý tưởng cho những người muốn trải nghiệm hương vị
                                    đặc trưng của Đà Lạt
                                </p>
                                <a
                                    href="#"
                                    className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
                                >
                                    Mua
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img
                                    src="img/baner-1.png"
                                    className="img-fluid w-100 rounded"
                                    alt=""
                                />
                                <div
                                    className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                                    style={{ width: 140, height: 140, top: 0, left: 0 }}
                                >
                                    <h1 style={{ fontSize: 100 }}>1</h1>
                                    <div className="d-flex flex-column">
                                        <span className="h2 mb-0">...</span>
                                        <span className="h4 text-muted mb-0">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* Banner Section End */}
        </>

    )
}

export default BannerSession