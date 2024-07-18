import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetdetailProduct } from '../../../api/Sanpham';
import { useLocale } from 'antd/es/locale';
import { AddCart, GetALLCart } from '../../../api/cart';
import { useAuth } from '../context/AuthContext';
import { message } from 'antd';
import { GetAllPr, GetAllUS, PostComment } from '../../../api/binhluan';
import PaginationSanPham from '../../admin/sanpham/PaginationSanPham';
import PaginationComment from './PaginationComment';
import DeleteComment from './DeleteComment';
import { formatCurrency } from '../../../format/price';

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
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const [data, setData] = useState([])
    const { userData, setNumCart } = useAuth()
    const query = useQuery();
    const [quantity, setquantity] = useState(1)
    const navigate = useNavigate()
    const [comment, setCommnent] = useState('')
    const [dataComment, setDataComment] = useState([])
    const OkComment = comment !== ''
    const id = query.get('id'); // Lấy giá trị của tham số id từ URL
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [commentUserIds, setCommentUserIds] = useState([]);
    const [isComment, setIsComment] = useState(false)
    const handleClickMinus = () => {
        if (quantity > 1) {
            setquantity(quantity - 1)
        }
    }
    const handleClickPlus = () => {
        setquantity(quantity + 1)
    }
    const handleAddComment = async (e) => {
        e.preventDefault()
        if (userData) {
            const dataComment = {
                "customerId": userData.id,
                "productId": parseInt(id),
                "comment": comment
            }
            await PostComment({ dataComment, token: userData.token })
                .then(x => {
                    message.destroy()
                    message.success('Thành công')
                    setCommnent('')
                    setDataComment(x)
                })
                .catch(err => {
                    console.log(err)
                    message.error(err)
                })
        }
        else {
            message.destroy()
            message.error('Vui lòng đăng nhập để đánh giá sản phẩm')
        }
    }
    const hanleAddToCart = async () => {
        const dataCart =
        {
            "productID": id,
            "productName": data.productName,
            "quantity": quantity,
            "productUnit": data.unit,
            "productImage": data.image
        }
        if (userData) {
            await AddCart({ id: userData.id, dataCart, token: userData.token })
                .then(data => {
                    message.destroy()
                    message.success('Thêm thành công')
                    GetALLCart({ id: userData.id, token: userData.token })
                        .then(data => setNumCart(data.length))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        else {
            message.destroy()
            message.error('Vui lòng đăng nhập')
        }
    }
    useEffect(() => {
        if (userData) {

        }
    }, [userData])
    useEffect(() => {
        if (userData) {
            if (data) {
                setIsComment(commentUserIds.includes(userData.id))
            }
        }
    }, [data, userData])
    useEffect(() => {
        if (id) {
            GetdetailProduct({ id })
                .then(data => {
                    setData(data[0])
                    const ids = data[0].commentUserIds
                        .split(',')
                        .filter(id => id.trim() !== '')
                        .map(id => parseInt(id, 10));
                    setCommentUserIds(ids);
                    GetAllPr({ id })
                        .then(data => {
                            setDataComment(data)
                            setStateData(true)
                        })
                        .catch(err => {
                            console.log(err)
                            setStateData(false)
                        })
                })
                .catch(err => {
                    console.log(err)
                    navigate('/404')
                    setStateData(false)
                }
                )
        }

    }, [id])
    function formatISODateToDateString(isoDateString) {
        // Tạo một đối tượng Date từ chuỗi ISO
        const date = new Date(isoDateString);

        // Lấy các phần của ngày, tháng và năm
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();

        // Định dạng lại ngày theo dạng ngày/tháng/năm
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = dataComment.slice(firstPostIndex, lastPostIndex)
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
                                                src={data.image}
                                                className="img-fluid rounded"
                                                alt="Image"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">

                                    <h4 className="fw-bold mb-3">{data.productName}</h4>
                                    <p className="mb-3">Loại: {data.categoryName}</p>
                                    <h5 className="fw-bold mb-3">{formatCurrency(`${data.price}đ`)}</h5>
                                    <p className="mb-4">
                                        {data.description}
                                    </p>
                                    {/* <p className="mb-4">
                                        - Nên sản phẩm sau khi chế biến vẫn giữ được nguyên hương vị,
                                        màu sắc tự nhiên, giá trị dinh dưỡng không bị biến đổi, có quy
                                        trình sản xuất đảm bảo 100% an toàn vệ sinh thực phẩm.
                                    </p> */}
                                    <div className="input-group quantity mb-5" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={handleClickMinus}>
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            value={quantity}
                                        />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={handleClickPlus}>
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <button

                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                        onClick={hanleAddToCart}
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Giỏ hàng
                                    </button>
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
                                    <div className="tab-content">
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
                                                                <p className="mb-0"> {data.component}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Trọng Lượng</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{data.weight} {data.unit}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">xuất sứ</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{data.origin}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">HSD</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{data.expirationDate}</p>
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
                                            {currentPosts.length > 0 ?
                                                <>
                                                    <div className="" style={{
                                                        maxHeight: '520px'
                                                    }}>

                                                        {currentPosts.length > 0 && currentPosts.map((item, index) =>
                                                            <div className="d-flex">
                                                                <img
                                                                    src={item.avatar}
                                                                    className="img-fluid rounded-circle p-3"
                                                                    style={{ width: 100, height: 100 }}
                                                                    alt=""
                                                                />
                                                                <div className="">
                                                                    <p className="mb-2" style={{ fontSize: 14 }}>
                                                                        {
                                                                            formatISODateToDateString(item.createdDate)
                                                                        }
                                                                    </p>
                                                                    <div className="d-flex justify-content-between">
                                                                        <h5>{item.customerName}</h5>
                                                                        {
                                                                            userData &&
                                                                            item.customerId === userData.id &&
                                                                            <DeleteComment idproduct={id} id={item.id} token={userData.token} setData={setDataComment} />
                                                                        }
                                                                    </div>
                                                                    <p>
                                                                        {item.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                                :
                                                <div className=''>
                                                    <p style={{}}>Chưa có bình luận nào</p>
                                                </div>}

                                            <div className='' style={{ marginLeft: '15px', marginTop: '-6px' }}>
                                                {
                                                    stateData &&
                                                    <PaginationComment
                                                        currentPage={currentPage}
                                                        setCurrentPage={setCurrentPage}
                                                        totalPosts={dataComment.length}
                                                        PostsPerPage={postsPerPage} />
                                                }
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
                                {
                                    isComment &&
                                    <form >
                                        <h4 className="mb-5 fw-bold">Để lại đánh giá</h4>
                                        <div className="row g-4">

                                            <div className="col-lg-12">
                                                <div className="border-bottom rounded my-4">
                                                    <textarea
                                                        name=""
                                                        id=""
                                                        value={comment}
                                                        onChange={(e) => setCommnent(e.target.value)}
                                                        className="form-control border-0"
                                                        cols={30}
                                                        rows={8}
                                                        placeholder="Nhập đánh giá"
                                                        spellCheck="false"
                                                        defaultValue={""}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="d-flex justify-content-between py-3">
                                                    {OkComment ?
                                                        <button
                                                            type='button'
                                                            className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                            onClick={handleAddComment}
                                                        >
                                                            Đăng
                                                        </button>
                                                        :
                                                        <button
                                                            type='submit'
                                                            className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                        >
                                                            Đăng
                                                        </button>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">

                                {/* <div className="col-lg-12">
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
                                </div> */}
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
                    {/* <h1 className="fw-bold mb-0">Sản Phẩm Khác</h1>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={1500}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
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
                    </div> */}
                </div>
            </div>
            {/* Single Product End */}
        </>

    )
}

export default SignleProduct