import React from 'react'

function ContactLH() {
    return (
        <>
            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Cung ứng đặc sản Mai Quỳnh</h1>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.0573363357275!2d108.4391680758479!3d11.97053223603299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112c7861a6d81%3A0x93c768417b0791af!2zMjU4IMSQxrDhu51uZyBQaMO5IMSQ4buVbmcgVGhpw6puIFbGsMahbmcsIFBoxrDhu51uZyA4LCBUaMOgbmggcGjhu5EgxJDDoCBM4bqhdCwgTMOibSDEkOG7k25nLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1717513086368!5m2!1sen!2s"
                                        height={450}
                                        style={{ border: 0, width: '100%' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form action="" className="">
                                    <input
                                        type="text"
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        placeholder="Họ Tên"
                                    />
                                    <input
                                        type="email"
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        placeholder="Email"
                                    />
                                    <textarea
                                        className="w-100 form-control border-0 mb-4"
                                        rows={5}
                                        cols={10}
                                        placeholder="Nội Dung"
                                        defaultValue={""}
                                    />
                                    <button
                                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Địa Chỉ</h4>
                                        <p className="mb-2">
                                            258 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Email</h4>
                                        <p className="mb-2"> dacsanmaiquynhdalat@gmail.com</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Điện Thoại</h4>
                                        <p className="mb-2">0931 181 414</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>

    )
}

export default ContactLH