import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function SignleProduct() {
    return (
        <>
            {/* Single Product Start */}
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <a href="#">
                                            <img
                                                src="img/single-item.jpg"
                                                className="img-fluid rounded"
                                                alt="Image"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">Xoài Sấy Muối Ớt</h4>
                                    <p className="mb-3">Loại: Sấy dẻo</p>
                                    <h5 className="fw-bold mb-3">100 000đ</h5>
                                    <div className="d-flex mb-4">
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <p className="mb-4">
                                        - Xoài sấy dẻo có vị ngọt và hơi chua, tính nhiệt.
                                        <br />- Xoài chứa nhiều vitamin và khoáng chất
                                        <br />- Đặc biệt, các chất dinh dưỡng như protein, lipit, gluxit
                                        và nhất là tiền sinh tố A đều vượt xa các loại quả khác.
                                    </p>
                                    <p className="mb-4">
                                        - Nên sản phẩm sau khi chế biến vẫn giữ được nguyên hương vị,
                                        màu sắc tự nhiên, giá trị dinh dưỡng không bị biến đổi, có quy
                                        trình sản xuất đảm bảo 100% an toàn vệ sinh thực phẩm.
                                    </p>
                                    <div className="input-group quantity mb-5" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            defaultValue={1}
                                        />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Thêm Vào
                                        Giỏ Hàng
                                    </a>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button
                                                className="nav-link active border-white border-bottom-0"
                                                type="button"
                                                role="tab"
                                                id="nav-about-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-about"
                                                aria-controls="nav-about"
                                                aria-selected="true"
                                            >
                                                Mô Tả
                                            </button>
                                            <button
                                                className="nav-link border-white border-bottom-0"
                                                type="button"
                                                role="tab"
                                                id="nav-mission-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-mission"
                                                aria-controls="nav-mission"
                                                aria-selected="false"
                                            >
                                                Đánh Gía Sản Phẩm
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div
                                            className="tab-pane active"
                                            id="nav-about"
                                            role="tabpanel"
                                            aria-labelledby="nav-about-tab"
                                        >
                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Thành Phần</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0"> Xoài (95%), đường, muối, ớt</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Trọng Lượng</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">0.5 kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">xuất sứ</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Đà Lạt</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">HSD</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">6 Tháng</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane"
                                            id="nav-mission"
                                            role="tabpanel"
                                            aria-labelledby="nav-mission-tab"
                                        >
                                            <div className="d-flex">
                                                <img
                                                    src="img/avatar.jpg"
                                                    className="img-fluid rounded-circle p-3"
                                                    style={{ width: 100, height: 100 }}
                                                    alt=""
                                                />
                                                <div className="">
                                                    <p className="mb-2" style={{ fontSize: 14 }}>
                                                        April 12, 2024
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Jason Smith</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                    <p>
                                                        The generated Lorem Ipsum is therefore always free from
                                                        repetition injected humour, or non-characteristic words
                                                        etc. Susp endisse ultricies nisi vel quam suscipit{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img
                                                    src="img/avatar.jpg"
                                                    className="img-fluid rounded-circle p-3"
                                                    style={{ width: 100, height: 100 }}
                                                    alt=""
                                                />
                                                <div className="">
                                                    <p className="mb-2" style={{ fontSize: 14 }}>
                                                        April 12, 2024
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Sam Peters</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                    <p className="text-dark">
                                                        The generated Lorem Ipsum is therefore always free from
                                                        repetition injected humour, or non-characteristic words
                                                        etc. Susp endisse ultricies nisi vel quam suscipit{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-vision" role="tabpanel">
                                            <p className="text-dark">
                                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                                                tempor sit. Aliqu diam amet diam et eos labore. 3
                                            </p>
                                            <p className="mb-0">
                                                Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et
                                                eos labore. Clita erat ipsum et lorem et sit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#">
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 me-4"
                                                    placeholder="Yur Name *"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input
                                                    type="email"
                                                    className="form-control border-0"
                                                    placeholder="Your Email *"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea
                                                    name=""
                                                    id=""
                                                    className="form-control border-0"
                                                    cols={30}
                                                    rows={8}
                                                    placeholder="Your Review *"
                                                    spellCheck="false"
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div
                                                        className="d-flex align-items-center"
                                                        style={{ fontSize: 12 }}
                                                    >
                                                        <i className="fa fa-star text-muted" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <a
                                                    href="#"
                                                    className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                >
                                                    {" "}
                                                    Post Comment
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    <div className="input-group w-100 mx-auto d-flex mb-4">
                                        <input
                                            type="search"
                                            className="form-control p-3"
                                            placeholder="keywords"
                                            aria-describedby="search-icon-1"
                                        />
                                        <span id="search-icon-1" className="input-group-text p-3">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <h4 className="mb-4">Sản Phẩm Tương Tự</h4>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img
                                                src="img/featur-1.jpg"
                                                className="img-fluid rounded"
                                                alt="Image"
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img
                                                src="img/featur-2.jpg"
                                                className="img-fluid rounded"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img
                                                src="img/featur-3.jpg"
                                                className="img-fluid rounded"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div
                                            className="rounded me-4"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <img
                                                src="img/vegetable-item-4.jpg"
                                                className="img-fluid rounded"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div
                                            className="rounded me-4"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <img
                                                src="img/vegetable-item-5.jpg"
                                                className="img-fluid rounded"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div
                                            className="rounded me-4"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <img
                                                src="img/vegetable-item-6.jpg"
                                                className="img-fluid rounded"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">
                                                    4.11 $
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <a
                                            href="#"
                                            className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                                        >
                                            Vew More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <img
                                            src="img/banner-fruits.jpg"
                                            className="img-fluid w-100 rounded"
                                            alt=""
                                        />
                                        <div
                                            className="position-absolute"
                                            style={{
                                                top: "50%",
                                                right: 10,
                                                transform: "translateY(-50%)"
                                            }}
                                        >
                                            <h3 className="text-secondary fw-bold">
                                                Fresh <br /> Fruits <br /> Banner
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="fw-bold mb-0">Sản Phẩm Khác</h1>
                    <Carousel
                        swipeable={true} // Cho phép vuốt trên thiết bị cảm ứng
                        draggable={true} // Cho phép kéo trên thiết bị cảm ứng
                        showDots={true} // Hiển thị các chấm chỉ dẫn
                        responsive={responsive} // Cấu hình phản hồi theo kích thước màn hình
                        ssr={false} // Không render carousel trên server-side
                        infinite={true} // Vô hạn vòng lặp
                        autoPlay={true} // Tự động phát
                        autoPlaySpeed={1500} // Tốc độ tự động phát
                        keyBoardControl={true} // Điều khiển bằng bàn phím
                        customTransition="transform 500ms ease-in-out" // Hiệu ứng chuyển đổi tùy chỉnh
                        containerClass="carousel-container" // Lớp của container carousel
                        removeArrowOnDeviceType={["tablet", "mobile"]} // Ẩn mũi tên trên thiết bị di động và máy tính bảng
                        dotListClass="custom-dot-list-style" // Lớp của danh sách chấm chỉ dẫn
                        itemClass="carousel-item-padding-40-px" // Lớp của mỗi phần tử carousel
                    >
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-6.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-1.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-3.png"
                                    className="img-fluid w-100 rounded-top bg-light"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Banana</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-4.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Bell Papper</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-5.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-6.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-5.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 8px', maxWidth: '305px', maxHeight: '451px' }} className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img
                                    src="img/vegetable-item-6.jpg"
                                    className="img-fluid w-100 rounded-top"
                                    alt=""
                                />
                            </div>
                            <div
                                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, right: 10 }}
                            >
                                Vegetable
                            </div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                    eiusmod te incididunt
                                </p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                        cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Carousel>;
                    <div className="vesitable">

                        <div className="owl-carousel vegetable-carousel justify-content-center">

                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-6.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-1.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-3.png"
                                        className="img-fluid w-100 rounded-top bg-light"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Banana</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-4.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Bell Papper</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-5.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-6.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-5.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img
                                        src="img/vegetable-item-6.jpg"
                                        className="img-fluid w-100 rounded-top"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="text-white bg-primary px-3 py-1 rounded position-absolute"
                                    style={{ top: 10, right: 10 }}
                                >
                                    Vegetable
                                </div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod te incididunt
                                    </p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a
                                            href="#"
                                            className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                                        >
                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                                            cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Single Product End */}
        </>

    )
}

export default SignleProduct