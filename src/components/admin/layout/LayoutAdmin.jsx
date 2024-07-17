import React, { useEffect, useState } from 'react'
import '../../../assets/css/stylead.css'
import { Outlet } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Nav from './nav'

function LayoutAdmin() {
    return (
        <>
            <Nav />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Core</div>
                                <Link className='nav-link' to={'/admin/'}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-tachometer-alt" />
                                    </div>
                                    Dashboard
                                </Link>
                                <div className="sb-sidenav-menu-heading">Interface</div>
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseLayouts"
                                    aria-expanded="false"
                                    aria-controls="collapseLayouts"
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-columns" />
                                    </div>
                                    Sản phẩm
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down" />
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="collapseLayouts"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion"
                                >
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link className='nav-link' to={'/admin/loaisanpham'}>Loại sản phẩm</Link>
                                        <Link className='nav-link' to={'/admin/sanpham'}>Sản phẩm</Link>
                                    </nav>
                                </div>
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsePages"
                                    aria-expanded="false"
                                    aria-controls="collapsePages"
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-book-open" />
                                    </div>
                                    Tài khoản
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down" />
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="collapsePages"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#sidenavAccordion"
                                >
                                    <nav className="sb-sidenav-menu-nested nav accordion"
                                        id="sidenavAccordionPages">
                                        <Link className='nav-link' to={'/admin/loaitaikhoan'}>Loại tài khoản</Link>
                                        <Link className='nav-link' to={'/admin/khachhang'}>Khách Hàng</Link>
                                        <Link className='nav-link' to={'/admin/noibo'}>Nội bộ</Link>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Hóa Đơn</div>
                                <Link className="nav-link" to="/admin/hoadon">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-chart-area" />
                                    </div>
                                    Hóa đơn
                                </Link>
                                <Link className="nav-link" to="/admin/thongbao">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-table" />
                                    </div>
                                    Thông báo
                                </Link>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                            Start Bootstrap
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default LayoutAdmin