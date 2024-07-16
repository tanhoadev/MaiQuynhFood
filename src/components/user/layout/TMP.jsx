import React from 'react'

function TMP() {
    return (
        <div className=" text-lg-start text-white mt-5 bg-dark ">
            <div className="container-fluid p-4 pb-0 ">
                <section className="">
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
                                Chào mừng đến với cửa hàng gạo của chúng tôi, nơi bạn có thể tìm
                                thấy những hạt gạo chất lượng cao mang lại sự tươi ngon và dinh
                                dưỡng cho mỗi bữa ăn.
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-5 col-lg-4 col-xl-5 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold text-primary">Liên hệ</h6>
                            <p>
                                <i className="fas fa-home mr-3" />
                                134 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh,
                                Việt Nam
                            </p>
                            <p>
                                <i className="fas fa-envelope mr-3" /> shopquyen@gmail.com
                            </p>
                            <p>
                                <i className="fas fa-phone mr-3" /> + 01 234 567 88
                            </p>
                            <p>
                                <i className="fas fa-print mr-3" /> + 01 234 567 89
                            </p>
                        </div>
                    </div>
                </section>
                <hr className="my-3" />
                <section className="p-3 pt-0">
                    <div className="row align-items-center">
                        <div className="col-md-6 mx-auto d-flex justify-content-center col-lg-6 text-md-start">
                            <div className="">
                                © 2020 Copyright:
                                <a className="text-white" href="https://mdbootstrap.com/">
                                    MDBootstrap.com
                                </a>
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
                </section>
            </div>
        </div>
    )
}

export default TMP