import React, { useEffect, useState } from 'react'
import Banner from '../layout/Banner'
import { Link } from 'react-router-dom'
import { RegisterCus } from '../../../api/user'
import { message } from 'antd'
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap'

function MainDangKi() {
    const [name, setName] = useState('')
    const [fullName, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [load, setLoad] = useState(false)
    const [password, setPassworld] = useState('')
    const [repeatPass, setRepeatPass] = useState('')
    const isFormValid = name !== '' && fullName !== '' && phone !== '' && email !== '' && password !== '' && repeatPass !== '';
    const [error, setError] = useState('');
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(password)) {
            setError('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        } else {
            setError('');
        }
    };
    const handleRegist = () => {
        setLoad(true)
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(password)) {
            setError('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
            setLoad(false)
        } else {
            setError('');
            const dataUser =
            {
                "name": name,
                "fullName": fullName,
                "phonenumber": phone,
                "email": email,
                "dateOfBirth": date,
                "password": password,
                "repeatePassWord": repeatPass
            }
            if (password !== repeatPass) {
                message.destroy()
                message.error('Mật khẩu không trùng khớp')
                setLoad(false)
            }
            else {
                RegisterCus({ dataUser })
                    .then(x => {
                        message.destroy()
                        message.success('Tài khoản đã được đăng kí. Vui lòng vào mail để kích hoạt')
                        setLoad(false)
                    })
                    .catch(err => {
                        setLoad(false)
                        if (err.response) {
                            message.destroy()
                            message.error(err.response.data.message)
                        }
                        else {
                            message.error('Lỗi hệ thống')
                        }
                    })
            }
        }

    }
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title="Đăng kí" />
            <div className="auth-bg mt-5">
                <div className="container-fluid">
                    <div className="row g-0 justify-content-center">
                        <div className="card col-lg-8 col-xl-7 col-md-11">
                            <div className="card-body authentication-page-content">
                                <div className="d-flex flex-column h-100 px-4 pt-4">
                                    <div className="row justify-content-center my-auto">
                                        <div className="col-sm-8 col-lg-8 col-xl-7 col-xxl-8" style={{ maxWidth: '550px' }}>
                                            <div className="" style={{ padding: '0 !important' }}>

                                                <form id="changePassForm">
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Tên tài khoản
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                name="text"
                                                                required
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Họ và tên
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                name="pass"
                                                                required
                                                                value={fullName}
                                                                onChange={(e) => setFullname(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Số điện thoại
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control pr-44"
                                                                name="pass"
                                                                required
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Email
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="email"
                                                                className="form-control pr-44"
                                                                name="pass"
                                                                required
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Ngày sinh
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="date"
                                                                className="form-control pr-44"
                                                                required
                                                                value={date}
                                                                onChange={(e) => setDate(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Mật khẩu
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                value={password}
                                                                onChange={(e) => setPassworld(e.target.value)}
                                                                type="password"
                                                                className="form-control pr-44"
                                                                required
                                                            />
                                                            {error && <div className="text-danger">{error}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="oldpassword-input"
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Nhập lại mật khẩu
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control pr-44"
                                                                required
                                                                value={repeatPass}
                                                                onChange={(e) => setRepeatPass(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>
                                                    <input type="hidden" asp-for="Id" />
                                                    <input type="hidden" asp-for="matKhau" />
                                                    <div className="text-center mt-4">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {load ?
                                                                    <Button className="btn btn-primary w-100" variant="primary" disabled>
                                                                        <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                                                        </Spinner>
                                                                    </Button>
                                                                    :
                                                                    <>
                                                                        {isFormValid ?
                                                                            <button className="btn btn-primary w-100" type="button" onClick={handleRegist}>
                                                                                Xác nhận
                                                                            </button>
                                                                            :
                                                                            <button className="btn btn-primary w-100" type="submit">
                                                                                Xác nhận
                                                                            </button>
                                                                        }
                                                                    </>
                                                                }



                                                                <hr />
                                                                <div className="text-center">
                                                                    <Link to='/dangnhap'>Bạn đã có tài khoản? Đăng nhập ngay!</Link>
                                                                </div>
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

export default MainDangKi