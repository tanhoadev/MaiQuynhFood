import React, { useState } from 'react'
import Banner from '../layout/Banner'
import { useAuth } from '../context/AuthContext'
import { message } from 'antd'
import { UpdatePassUsser } from '../../../api/user'
import { Spinner } from 'react-bootstrap'
import OTP from './OTP'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MainDoiMatKhau() {
    const { userData } = useAuth()
    const [passOld, setPassOld] = useState('')
    const [passNew, setPassNew] = useState('')
    const [passRepeate, setPassRepeate] = useState('')
    const ok = passOld !== '' && passNew !== '' && passRepeate !== ''
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangePass = () => {
        if (passNew !== passRepeate) {
            message.destroy()
            message.error('Mật khẩu nhập lại không khớp')
        }
        else {
            if (passOld === passNew) {
                message.destroy()
                message.error('Mật khẩu mới không được trùng với mật khẩu cũ')
            }
            else {
                setLoad(true)
                const userDatas = {
                    "userName": userData.name,
                    "password": passOld,
                    "newPass": passNew
                }
                UpdatePassUsser({ userDatas })
                    .then(x => {
                        message.destroy()
                        message.success('Thành công')
                        setLoad(false)
                        setShow(true)
                    })
                    .catch(err => {
                        if (err.response) {
                            message.destroy()
                            message.error(err.response.data.message)
                        }
                        else {
                            console.log(err)
                            message.error('Lỗi máy chủ')
                        }
                        setLoad(false)
                    })
            }
        }
    }
    return (
        <>
            <Banner title="Đổi mật khẩu" />

            <Modal
                show={show}
                centered
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Body>
                    {
                        userData && <OTP name={userData.name} pass={passNew} setShow={setShow} />
                    }
                </Modal.Body>
            </Modal>
            <div className="auth-bg mt-5">
                <div className="container-fluid">
                    <div className="row g-0 justify-content-center">
                        <div className="card col-lg-8 col-xl-7 col-md-11">
                            <div className="card-body authentication-page-content">
                                <div className="d-flex flex-column h-100 px-4 pt-4">
                                    <div className="row justify-content-center my-auto">
                                        <div className="col-sm-8 col-lg-8 col-xl-7 col-xxl-8" style={{ maxWidth: '550px' }}>
                                            <div className="">
                                                <div className="user-thumb text-center mb-4">
                                                    <img
                                                        src={userData && userData.image}
                                                        className="rounded-circle img-thumbnail avatar-lg"
                                                        alt="thumbnail"
                                                    />
                                                    <h5 className="font-size-16 mt-3 cl-change-pass" />
                                                </div>
                                                <form id="changePassForm">
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Mật khẩu cũ
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                value={passOld}
                                                                onChange={(e) => setPassOld(e.target.value)}
                                                                required
                                                                placeholder="Nhập mật khẩu cũ"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="newpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Mật khẩu mới
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control pr-44"
                                                                name="newPass"
                                                                required
                                                                value={passNew}
                                                                onChange={(e) => setPassNew(e.target.value)}
                                                                placeholder="Nhập mật khẩu mới"
                                                                id="password-input"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="confirmpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Nhập lại mật khẩu
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control pr-44"
                                                                name="confirmPass"
                                                                value={passRepeate}
                                                                required
                                                                onChange={(e) => setPassRepeate(e.target.value)}
                                                                id="confirmpassword-input"
                                                                placeholder="Nhập lại mật khẩu mới"
                                                            />
                                                        </div>
                                                    </div>
                                                    <input type="hidden" asp-for="Id" />
                                                    <input type="hidden" asp-for="matKhau" />
                                                    <div className="text-center mt-4">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {ok ?
                                                                    <>
                                                                        {load ?
                                                                            <button className="btn btn-primary w-100" type="button" disabled>
                                                                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                                                                </Spinner>
                                                                            </button>
                                                                            :
                                                                            <button className="btn btn-primary w-100" type="button" onClick={handleChangePass}>
                                                                                Xác nhận
                                                                            </button>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <button className="btn btn-primary w-100" type="submit">
                                                                        Xác nhận
                                                                    </button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDoiMatKhau