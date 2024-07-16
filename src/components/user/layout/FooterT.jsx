import React from 'react'

function FooterT() {
    return (
        <div className="container-fluid bg-dark text-white-50 footer pt-5" style={{ padding: '0 120px !important' }}>
            <div className="container py-5">
                <div className="row g-5" style={{
                    // 'borderBottom': '1px solid rgba(226, 175, 24, 0.5)'
                }}>
                    <div className="row">
                        <div
                            className="col-md-7 col-lg-8 col-xl-7 mx-auto mt-3"
                            style={{ margin: "0 !important" }}
                        >
                            <h6 className="text-uppercase mb-4 font-weight-bold"></h6>
                            <h1 className="mb-4 display-5 font-weight-semi-bold text-primary">
                                Mai Quỳnh
                            </h1>
                            <p>
                                Chào mừng đến với cửa hàng đặc sản Đà Lạt của chúng tôi, nơi bạn có thể tìm thấy những sản phẩm chất lượng cao, mang đậm hương vị và đặc trưng của vùng đất Đà Lạt.
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-5 col-lg-4 col-xl-5 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold text-primary">Liên hệ</h6>
                            <p>
                                <i className="fas fa-home mr-3" /> 258 Đường Phù Đổng Thiên Vương, Phường 8, TP Đà Lạt
                            </p>
                            <p>
                                <i className="fas fa-envelope mr-3" /> dacsanmaiquynhdalat@gmail.com
                            </p>
                            <p>
                                <i className="fas fa-phone mr-3" /> + 0931 181 414
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row g-5 mt-1">
                    <div className="row align-items-center">
                        <div className="col-md-6 mx-auto d-flex justify-content-center col-lg-6 text-md-start">
                            <div className="">
                                <p>© 2024 Đồ án tốt nghiệp: Trang web mua hàng - Nhóm sinh viên: Bùi Tấn Hòa, Lê Quang Minh Quân, Sầm Thị Hồng Như - Trường Cao đẳng an ninh mạng iSPACE.</p>
                            </div>
                        </div>
                        <div
                            className="col-md-6 p-md-6 col-lg-6 mt-3 mx-auto d-flex justify-content-center text-md-end"
                            style={{
                                justifyContent: "flex-start",
                                marginRight: "calc(auto - 12px)"
                            }}
                        >
                            <a className="btn btn-outline-light btn-floating m-1" role="button">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a className="btn btn-outline-light btn-floating m-1" role="button">
                                <i className="fab fa-twitter" />
                            </a>
                            <a className="btn btn-outline-light btn-floating m-1" role="button">
                                <i className="fab fa-google" />
                            </a>
                            <a className="btn btn-outline-light btn-floating m-1" role="button">
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default FooterT