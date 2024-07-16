import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { GetALLCustomerCate } from '../../../api/LoaiTK';
import { AddUser } from '../../../api/user';

function AddTaiKhoanKhachAd({ setData }) {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isActive, setIsActive] = useState(0)
    const [customCateID, setCustomCateId] = useState()
    const [dataCate, setDataCate] = useState([])
    // const { token } = useAuth()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        GetALLCustomerCate()
            .then(data => {
                setDataCate(data)
                setCustomCateId(data[0].id)
                console.log(data)
            })
            .catch(err => console.log(err))
    }, [])
    const handleAddUser = async () => {
        // if (img) {
        setLoad(true)
        const dataUser = {
            "name": name,
            "email": email,
            "password": password,
            "isActive": isActive,
            "customerCateID": customCateID
        }
        await AddUser({ dataUser })
            .then((data) => {
                message.success("Thêm thành công tài khoán")
                setData(data)
                setLoad(false)
                setShow(false)
            })
            .catch(err => {
                message.error(err.message)
                setLoad(false)
            })
        // }
        // else {
        //     message.error('please select the image')
        // }
    }
    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setLoad(true)
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
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoad(false)
                })
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Group className="mb-3" >
                                <Form.Label> Tên tài khoản:</Form.Label>
                                <Form.Control
                                    type="text"
                                    min={1}
                                    max={60}
                                    autoFocus
                                    value={name}
                                    onChange={(e) => { setName(e.target.value.trimStart()); }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label> Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    min={1}
                                    max={60}
                                    autoFocus
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value.trimStart()); }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label> Mật khẩu:</Form.Label>
                                <Form.Control
                                    type="text"
                                    min={1}
                                    max={60}
                                    autoFocus
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value.trimStart()); }}
                                    required
                                />
                            </Form.Group>
                            <Form.Label> Trạng thái:</Form.Label>
                            <Form.Group className="mb-3" >
                                <Form.Select aria-label="Default select example" onChange={(e) => setIsActive(e.target.value)} value={isActive}>
                                    <option value={0}>Đóng</option>
                                    <option value={1}>Mở</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Label> Loại:</Form.Label>
                            <Form.Group className="mb-3" >
                                <Form.Select aria-label="Default select example" onChange={(e) => setCustomCateId(e.target.value)} value={customCateID}>
                                    {
                                        dataCate && dataCate.map(item => (
                                            <option value={item.id}>{item.customerCateName}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Control.Feedback type='invalid'>
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">
                                Image:
                            </label>
                            <div className="d-flex justify-content-between flex-wrap">
                                <img id='img-showback' style={{ minHeight: '100px', maxHeight: '200px', objectFit: 'cover', maxWidth: '400px' }} src='' alt="s" />
                                <input type="file" onChange={handleChangeImage} required className="form-control file-img" id="" accept='image/*' />
                            </div>
                        </div> */}


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleAddUser}>
                                Add
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTaiKhoanKhachAd