import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { GetALLCart } from '../../../api/cart'
import NotificationUS from './NotificationUS'

function Navigation() {
    const { userData, logout, NumCart, setNumCart } = useAuth()
    const navi = useNavigate()
    const handleLogout = () => {
        logout()
        navi('/dangnhap')
    }
    useEffect(() => {
        if (userData) {
            GetALLCart({ id: userData.id, token: userData.token })
                .then(data => setNumCart(data.length))
                .catch(err => console.log(err))
        }
    }, [userData])
    return (
        <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">
                <div className="d-flex justify-content-between">
                    <div className="top-info ps-2">
                        <small className="me-3">
                            <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                            <a href="#" className="text-white">
                                258 Đường Phù Đổng Thiên Vương, Phường 8, TP Đà Lạt
                            </a>
                        </small>
                        <small className="me-3">
                            <i className="fas fa-envelope me-2 text-secondary" />
                            <a href="#" className="text-white">
                                dacsanmaiquynhdalat@gmail.com
                            </a>
                        </small>
                    </div>
                    <div className="top-link pe-2">
                        {/* <a href="#" class="text-white"><small class="text-white mx-2">Privacy Policy</small>/</a>
                  <a href="#" class="text-white"><small class="text-white mx-2">Terms of Use</small>/</a>
                  <a href="#" class="text-white"><small class="text-white ms-2">Sales and Refunds</small></a> */}
                    </div>
                </div>
            </div>
            <div className="container px-0">
                <nav className="navbar navbar-light bg-white navbar-expand-xl">
                    <Link to={'/'} className="navbar-brand">
                        <h1 className="text-primary display-6">Mai Quỳnh</h1>
                    </Link>
                    <button
                        className="navbar-toggler py-2 px-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars text-primary" />
                    </button>
                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div className="navbar-nav mx-auto">
                            <Link to={'/'} className="nav-item nav-link ">
                                Trang Chủ
                            </Link>
                            <Link to={'/cuahang'} className="nav-item nav-link ">
                                Cửa hàng
                            </Link>
                            {/* <div className="nav-item dropdown">
                                <a
                                    href="sanpham.html"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Sản Phẩm
                                </a>
                                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                    <Link to={'cuahang'} className="dropdown-item">
                                        Tất Cả Sản Phẩm
                                    </Link>
                                    <a href="sanpham.html" className="dropdown-item">
                                        Nước Trái Cây
                                    </a>
                                    <a href="chackout.html" className="dropdown-item">
                                        Trà - Cafe
                                    </a>
                                    <a href="testimonial.html" className="dropdown-item">
                                        Kẹo - Mứt
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        Atiso
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        Sấy Giòn
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        Sấy Dẻo
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        Hồng
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        Các Loại Khô
                                    </a>
                                </div>
                            </div> */}
                            <Link to='gioithieu' className="nav-item nav-link">
                                Giới Thiệu
                            </Link>
                            <Link to='lienhe' className="nav-item nav-link">
                                Liên Hệ
                            </Link>
                        </div>
                        <div className="d-flex m-3 me-0">
                            <button
                                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                                data-bs-toggle="modal"
                                data-bs-target="#searchModal"
                            >
                                <i className="fas fa-search text-primary" />
                            </button>
                            {(userData) &&
                                <Link to="/giohang" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    {NumCart > 0 &&
                                        <span
                                            className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                            style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
                                        >
                                            {NumCart}
                                        </span>
                                    }
                                </Link>
                            }
                            {
                                userData &&
                                <>
                                    <NotificationUS />
                                </>
                            }
                        </div>
                        {
                            (!userData) && <>
                                <Link to={'/dangnhap'} style={{ marginRight: '8px' }}>Đăng nhập</Link>
                                <Link to={'/dangki'}>Đăng kí</Link>
                            </>
                        }
                        {(userData) && <div className="">
                            <div className="col-lg-3 profile-pc">
                                <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        data-toggle="dropdown"
                                        className="nav-link dropdown-toggle user-action"
                                        style={{ color: "#1C1C1C" }}
                                    >
                                        <img src={userData.image} className="img-user-nav" style={{ width: '36px', marginRight: '9px' }} alt="Avatar" />
                                        {userData.name}
                                        <b className="caret" />
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link to={'/thongtin'} className="dropdown-item">
                                            <i className="fas fa-user" /> Tài khoản của tôi
                                        </Link>
                                        <Link to={'/lichsu'} className="dropdown-item">
                                            <i className="fas fa-money-check" /> Đơn hàng
                                        </Link>
                                        <Link to={'/doimatkhau'} className="dropdown-item">
                                            <i className="fas fa-exchange-alt" /> Đổi mật khẩu
                                        </Link>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt" /> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                </nav>
            </div>
        </div>
    )
}

export default Navigation