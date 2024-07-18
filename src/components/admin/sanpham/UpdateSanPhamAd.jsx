import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { GetALLProductCate } from '../../../api/LoaiSP';
import { UpdateProduct } from '../../../api/Sanpham';
import { Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';

function UpdateSanPhamAd({ expirationDate1, component1, weight1, unit1, quan1, price1, origin1, desc1, name1, image1, data, setData, currentPage, id }) {
    const [img, setImg] = useState("")
    // const { token } = useAuth()
    const [load, setLoad] = useState(false)
    const [name, setName] = useState(name1)

    const [show, setShow] = useState(false);
    const [showModalId, setShowModalId] = useState(null);

    const handleShow = (modalId) => setShowModalId(modalId);
    const handleClose = () => {
        setShow(false)
        setName(name1)
        setShowModalId(null)
    };
    const [categoryId, setCategory] = useState()
    const [weight, setWeight] = useState()
    const [unit, setUnit] = useState()
    const [price, setPrice] = useState()
    // const [salePrice, setSaleprice] = useState()
    const [quan, setQuan] = useState()
    const [origin, setOrigin] = useState()
    const [desc, setDesc] = useState()
    const [dataCate, setDataCate] = useState([])
    const [component, setComponent] = useState()
    const [expirationDate, setExprationDate] = useState()
    // const handleShow = () => setShow(true);
    useEffect(() => {
        GetALLProductCate()
            .then(data => {
                setDataCate(data)
                setCategory(data[0].id)
            })
            .catch(err => console.log(err))
    }, [])
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
    const handleUpdateBackCard = async () => {
        const datacate = {
            customerCateName: name,
        }
        if (name === '') {
            message.destroy()
            message.error('Không được để trống trường thông tin')
            setLoad(false)
        }
        else {
            const dataProduct = {
                "productName": name,
                "categoryId": categoryId,
                "image": img,
                "weight": weight,
                "unit": unit,
                "price": price,
                "salePrice": 0,
                "quantitySold": quan,
                "favorites": 0,
                "origin": origin,
                "remaining": 0,
                "expirationDate": expirationDate,
                "description": desc,
                "component": component
            }
            UpdateProduct({ id, dataProduct })
                .then(data => {
                    setData(data)
                    swal({
                        title: "Thành công!",
                        text: "Sản phẩm đã được cập nhật thành công!",
                        icon: "success",
                    });
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
        setWeight(weight1)
        setUnit(unit1)
        setQuan(quan1)
        setOrigin(origin1)
        setDesc(desc1)
        setImg(image1)
        setName(name1)
        setPrice(price1)
        setComponent(component1)
        setExprationDate(expirationDate1)
    }, [currentPage, data])

    return (
        <>
            <Button id={`upadate${id}`} variant="primary" onClick={() => handleShow(id)}>
                <i class="fa-solid fa-pen"></i>
            </Button>
            <Modal show={showModalId === id} size='xl' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Tên sản phẩm:</Form.Label>
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
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Loại:</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)} value={categoryId}>
                                        {dataCate && dataCate.map(item => (
                                            <option key={item.id} value={item.id}>{item.categoryName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Khối lượng:</Form.Label>
                                    <Form.Control
                                        type="Number"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={weight}
                                        onChange={(e) => { setWeight(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Đơn vị:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={unit}
                                        onChange={(e) => { setUnit(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Giá:</Form.Label>
                                    <Form.Control
                                        type="Number"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={price}
                                        onChange={(e) => { setPrice(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Hàng tồn:</Form.Label>
                                    <Form.Control
                                        type="Number"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={quan}
                                        onChange={(e) => { setQuan(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Nguồn gốc:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={origin}
                                        onChange={(e) => { setOrigin(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <Col>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">
                                                Hình ảnh:
                                            </label>
                                            <div className="d-flex justify-content-between flex-wrap">
                                                <img id='img-showback' style={{ minHeight: '100px', maxHeight: '200px', objectFit: 'cover', maxWidth: '400px' }} src={img} alt="s" />
                                                <input type="file" onChange={handleChangeImage} required className="form-control file-img" id="" accept='image/*' />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Thành phần:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={component}
                                        onChange={(e) => { setComponent(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label> Hạn dùng:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={expirationDate}
                                        onChange={(e) => { setExprationDate(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label> Mô tả:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    min={1}
                                    max={60}
                                    autoFocus
                                    value={desc}
                                    onChange={(e) => { setDesc(e.target.value.trimStart()); }}
                                    required
                                />
                            </Form.Group>
                        </Row>
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

export default UpdateSanPhamAd