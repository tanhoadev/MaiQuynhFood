import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import Example from '../../NewE';
import { AddNoti, GetAllNoti } from '../../../api/Thongbao';
import swal from 'sweetalert';
function AddThongBaoAd({ setData }) {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)
    const [writeNotifi, setWriteNotify] = useState('')
    // const { token } = useAuth()
    const [title, setTitle] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddUser = async () => {
        setLoad(true)
        if (title === '' || writeNotifi === '') {
            message.destroy();
            message.error('Vui lòng nhập đủ các trường')
            setLoad(false)
        }
        else {
            const dataNoti = {
                "title": title,
                "contentValue": writeNotifi
            }
            AddNoti({ dataNoti })
                .then(data => {
                    setLoad(false)
                    setShow(false)
                    setTitle('')
                    message.destroy()
                    swal({
                        title: "Thành công!",
                        text: "Thông báo đã được thêm thành công!",
                        icon: "success",
                    });
                    setData(data)
                })
                .catch(err => {
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

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label> Tiêu đề:</Form.Label>
                            <Form.Control
                                type="text"
                                min={1}
                                max={60}
                                autoFocus
                                value={title}
                                onChange={(e) => { setTitle(e.target.value.trimStart()); }}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Example data={setWriteNotify} />
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
                                Thêm
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddThongBaoAd