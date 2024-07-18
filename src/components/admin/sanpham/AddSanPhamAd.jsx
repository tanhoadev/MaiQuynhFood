import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { GetALLProductCate } from '../../../api/LoaiSP';
import { AddProduct } from '../../../api/Sanpham';
import { Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';
function AddSanPhamAd({ setData }) {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)
    // const { token } = useAuth()
    const [name, setName] = useState('')
    const [categoryId, setCategory] = useState()
    const [weight, setWeight] = useState(300)
    const [unit, setUnit] = useState('g')
    const [price, setPrice] = useState(45000)
    // const [salePrice, setSaleprice] = useState()
    const [quan, setQuan] = useState(100)
    const [origin, setOrigin] = useState('Đà Lạt')
    const [desc, setDesc] = useState('Cà phê dài là sự hòa quyện tinh tế giữa hương vị đậm đà của cà phê và hương thơm đặc trưng của các loại hạt cà phê chất lượng cao. Mỗi sản phẩm mang đến trải nghiệm cà phê đích thực, ngon ngất ngây và sảng khoái. Được chế biến từ những hạt cà phê rang xay tỉ mỉ, cà phê dài không chỉ thỏa mãn cơn khát cà phê mà còn là lựa chọn tuyệt vời để thưởng thức hương vị tinh tế mỗi ngày.')
    const [dataCate, setDataCate] = useState([])
    const [component, setComponent] = useState('đường')
    const [expirationDate, setExpirationDate] = useState('12 tháng')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        GetALLProductCate()
            .then(data => {
                setDataCate(data)
                setCategory(data[0].id)
            })
            .catch(err => console.log(err))
    }, [])
    const handleAddUser = async () => {
        if (img) {
            setLoad(true)
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
            await AddProduct({ dataProduct })
                .then((data) => {
                    swal({
                        title: "Thành công!",
                        text: "Sản phẩm đã được thêm thành công!",
                        icon: "success",
                    });
                    setData(data)
                    setLoad(false)
                    setShow(false)
                })
                .catch(err => {
                    message.error(err.message)
                    setLoad(false)
                })
        }
        else {
            message.error('please select the image')
        }
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
                Thêm
            </Button>

            <Modal show={show} size='xl' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm:</Form.Label>
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
                                    <Form.Label>Loại:</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={categoryId}
                                    >
                                        <option value="">Tất cả</option>
                                        {dataCate && dataCate.map(item => (
                                            <option value={item.id} key={item.id}>{item.categoryName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image:</Form.Label>
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <img id='img-showback' style={{ minHeight: '100px', maxHeight: '200px', objectFit: 'cover', maxWidth: '400px' }} src='' alt="s" />
                                        <input type="file" onChange={handleChangeImage} required className="form-control file-img" id="" accept='image/*' />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Khối lượng:</Form.Label>
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Đơn vị:</Form.Label>
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
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá:</Form.Label>
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hàng tồn:</Form.Label>
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
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Thành phần:</Form.Label>
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hạn dùng:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        min={1}
                                        max={60}
                                        autoFocus
                                        value={expirationDate}
                                        onChange={(e) => { setExpirationDate(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nguồn gốc:</Form.Label>
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
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mô tả:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        min={1}
                                        max={300}
                                        autoFocus
                                        value={desc}
                                        onChange={(e) => { setDesc(e.target.value.trimStart()); }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
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
                            <Button variant="primary" type='submit' onClick={handleAddUser}>
                                Thêm
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddSanPhamAd