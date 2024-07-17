import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { GetALLCustomerCate } from '../../../api/LoaiTK';
import { UpdateUser } from '../../../api/user';


function UpdateTaiKhoanKH({ name1, setData, email1, isActive1, customerCateID1, currentPage, id }) {
    const [img, setImg] = useState("")
    // const { token } = useAuth()
    const [load, setLoad] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isActive, setIsActive] = useState(0)
    const [customCateID, setCustomCateId] = useState()
    const [dataCate, setDataCate] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setName(name1)
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        GetALLCustomerCate()
            .then(data => {
                setDataCate(data)
            })
            .catch(err => console.log(err))
    }, [])
    const handleUpdateBackCard = async () => {
        const datacate = {
            "name": name,
            "email": email,
            "isActive": isActive,
            "customerCateID": customCateID
        }
        if (name === '') {
            message.destroy()
            message.error('Không được để trống trường thông tin')
            setLoad(false)
        }
        else {
            const dataUser = {
                "name": name,
                "email": email,
                "isActive": isActive,
                "customerCateID": customCateID
            }
            UpdateUser({ id, dataUser })
                .then(data => {
                    setData(data)
                    message.success('Cập nhật thành công')
                    handleClose()
                })
                .catch(error => {
                    if (error.response) {
                        message.error(error.response.data.message)
                    }
                    else {
                        message.error(error.message)
                    }
                })
        }
    }
    useEffect(() => {
        // setIsUsedUp(isUsed)
        // setImg(src)
        setName(name1)
        setEmail(email1)
        setIsActive(isActive1)
        setCustomCateId(customerCateID1)
    }, [currentPage])
    return (
        <>
            <Button id={`upadate${id}`} variant="primary" onClick={handleShow}>
                <i class="fa-solid fa-pen"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật tài khoản</Modal.Title>
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
                            <Form.Label> Trạng thái:</Form.Label>
                            <Form.Group className="mb-3" >
                                <Form.Select aria-label="Default select example" onChange={(e) => setIsActive(e.target.value)} value={isActive}>
                                    <option value={0}>Đóng</option>
                                    <option value={1}>Mở</option>
                                </Form.Select>
                            </Form.Group>

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
                        Hủy
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleUpdateBackCard}>
                                Cập nhật
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateTaiKhoanKH