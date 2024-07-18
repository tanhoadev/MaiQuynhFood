import React, { useEffect, useState } from 'react'
import Banner from '../layout/Banner'
import { useAuth } from '../context/AuthContext'
import { UpdateUsser } from '../../../api/user'
import { message } from 'antd'
import swal from 'sweetalert';
import Spinner from 'react-bootstrap/esm/Spinner';

// Hàm để chuyển đổi từ chuỗi ngày giờ thành định dạng yyyy-mm-dd

function MainInfo() {
    const { userData, setUserData } = useAuth()
    const [fullname, setFullname] = useState('')
    const [phoneNumber, setFullNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState()
    const [img, setImg] = useState("")
    const [load, setLoad] = useState(false)
    const validate = fullname !== '' && phoneNumber !== '' && dateOfBirth !== null
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    useEffect(() => {
        if (userData) {
            setFullname(userData.fullName)
            setFullNumber(userData.phone)
            setDateOfBirth(userData.dateOfBirth)
            setImg(userData.image)
        }
    }, [userData])
    const handleUpdate = () => {
        setLoad(true)
        const userDatas =
        {
            "fullName": fullname,
            "phonenumber": phoneNumber,
            "dateOfBirth": dateOfBirth,
            "image": img
        }
        UpdateUsser({ userDatas, id: userData.id })
            .then(data => {
                message.destroy()
                setLoad(false)
                swal({
                    title: "Thành công!",
                    text: "Cập nhật thành công thông tin",
                    icon: "success",
                });
                // const storedData = JSON.parse(localStorage.getItem('user_data'));
                localStorage.removeItem("user_data")
                const storedData = {
                    fullName: data.fullName,
                    image: data.image,
                    phone: data.phone,
                    dateOfBirth: data.dateOfBirth,
                    email: data.email,
                    name: data.name,
                    id: data.id,
                    token: data.token
                }
                localStorage.setItem("user_data", JSON.stringify({ user: storedData }))
                setUserData(storedData)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
            })
    }
    const [formData, setFormData] = useState({
        taiKhoan: '',
        hoTen: '',
        email: '',
        sDT: '',
        ngaySinh: '',
        avatar: '',
        anhDaiDien: '',
        id: '',
        iDTaiKhoan: '',
    });
    const initialDateTime = '2024-06-12T00:00:00';


    useEffect(() => {
        // Fetch initial data from API or local storage
        const savedData = JSON.parse(localStorage.getItem('accountInfo'));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('accountInfo', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                avatar: file,
                anhDaiDien: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to API
    };
    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0])
            const showImg = document.querySelector('#img-showback')
            showImg.src = URL.createObjectURL(e.target.files[0])

            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
            data.append("cloudName", process.env.REACT_APP_CLOUDNAME)
            fetch(process.env.REACT_APP_API_CLOUDINARY, {
                method: "post",
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString())
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <>
            <Banner title="Thông tin tài khoản" />
            <div className="container-fluid bg-secon-img mb-5" style={{ marginTop: '48px' }}>
                <div className="container-fluid">
                    <div className="main-body">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={userData && userData.image} id='img-showback' alt="Admin" className="rounded-circle p-1 img-profile" />
                                                <div className="mt-3">
                                                    <h4>{formData.taiKhoan}</h4>
                                                    <input type="file" name="avatar" className="btn btn-primary" id="img-profile" accept="image/*" hidden onChange={handleChangeImage} />
                                                    <label htmlFor="img-profile" className="btn btn-primary">Cập nhật ảnh</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Tên tài khoản</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" value={userData && userData.name} readOnly />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Họ và tên</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" name="hoTen" className="form-control" value={userData && fullname} required onChange={(e) => setFullname(e.target.value)} maxLength="19" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="email" name="email" disabled className="form-control" value={userData && userData.email} required onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Số điện thoại</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" name="sDT" className="form-control" value={userData && phoneNumber} required onChange={(e) => setFullNumber(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Ngày sinh</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="date" name="ngaySinh" id="datepicker" className="form-control" value={userData && dateOfBirth} required onChange={(e) => setDateOfBirth(e.target.value)} />
                                                    {/* <input type="date" name="ngaySinh" id="datepicker" className="form-control" value={'2024-01-01'} required /> */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9 text-secondary">
                                                    {validate ?
                                                        <>
                                                            {load ?
                                                                <>
                                                                    <button type="button" className="btn btn-primary px-4" disabled >
                                                                        <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                                                        </Spinner>
                                                                    </button>
                                                                </> :
                                                                <>
                                                                    <button type="button" className="btn btn-primary px-4" onClick={handleUpdate}>
                                                                        Lưu thay đổi
                                                                    </button>
                                                                </>}

                                                        </>
                                                        :
                                                        <button type="submit" className="btn btn-primary px-4">Lưu thay đổi</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainInfo