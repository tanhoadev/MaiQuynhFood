import React from 'react'

function FeatursSession() {
    return (
        <>
            {/* Featurs Section Start */}
            <div className="container-fluid featurs py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                    <i className="fas fa-car-side fa-3x text-white" />
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>FreeShip</h5>
                                    {/* <p class="mb-0">Free on order over $300</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                    <i className="fas fa-user-shield fa-3x text-white" />
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>Thanh toán bảo mật</h5>
                                    {/* <p class="mb-0">100% security payment</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                    <i className="fas fa-exchange-alt fa-3x text-white" />
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>Hoàn trả trong 7 ngày</h5>
                                    {/* <p class="mb-0">30 day money guarantee</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                    <i className="fa fa-phone-alt fa-3x text-white" />
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>Hỗ trợ 24/7</h5>
                                    {/* <p class="mb-0">Support every time fast</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featurs Section End */}
        </>

    )
}

export default FeatursSession