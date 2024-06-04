import React from 'react'

function Tastimonial() {
    return (
        <>
            {/* Tastimonial Start */}
            <div className="container-fluid testimonial py-5">
                <div className="container py-5">
                    {/* <div class="testimonial-header text-center">
      <h4 class="text-primary">Our Testimonial</h4>
      <h1 class="display-5 mb-5 text-dark">Our Client Saying!</h1>
  </div> */}
                    <div className="owl-carousel testimonial-carousel">
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i
                                    className=" fa-2x text-secondary position-absolute"
                                    style={{ bottom: 30, right: 0 }}
                                />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    {/* <p class="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p> */}
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img
                                            src="img/testimonial-1.jpg"
                                            className="img-fluid rounded"
                                            style={{ width: 100, height: 100 }}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Phạm Thị Như Quỳnh</h4>
                                        <p className="m-0 pb-3">Giám đốc</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i
                                    className=" fa-2x text-secondary position-absolute"
                                    style={{ bottom: 30, right: 0 }}
                                />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    {/* <p class="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p> */}
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img
                                            src="img/testimonial-1.jpg"
                                            className="img-fluid rounded"
                                            style={{ width: 100, height: 100 }}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Hoàng thị Thanh Hoa</h4>
                                        <p className="m-0 pb-3">Chăm Sóc Khách Hàng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i
                                    className=" fa-2x text-secondary position-absolute"
                                    style={{ bottom: 30, right: 0 }}
                                />
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    {/* <p class="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p> */}
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img
                                            src="img/testimonial-1.jpg"
                                            className="img-fluid rounded"
                                            style={{ width: 100, height: 100 }}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Trần Thiên Nam</h4>
                                        <p className="m-0 pb-3">Quản Lý</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tastimonial End */}
        </>

    )
}

export default Tastimonial