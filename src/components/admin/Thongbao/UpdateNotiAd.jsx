import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { UpdateNoti } from '../../../api/Thongbao';
import swal from 'sweetalert';
function UpdateNotiAd({ writeNoti1, title1, setData, id, currentPage }) {
    const [img, setImg] = useState("")
    // const { token } = useAuth()
    const [load, setLoad] = useState(false)
    const [title, setTitle] = useState('')
    const [writeNoti, setWriteNoti] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleUpdateBackCard = async () => {
        setLoad(true)
        const dataNoti = {
            "title": title,
            "contentValue": writeNoti
        }
        if (title === '' || writeNoti === '') {
            message.destroy()
            message.error('Không được để trống trường thông tin')
            setLoad(false)
        }
        else {
            UpdateNoti({ dataNoti, id })
                .then(data => {
                    setData(data)
                    swal({
                        title: "Thành công!",
                        text: "Thông báo đã được cập nhật thành công!",
                        icon: "success",
                    });
                    handleClose()
                    setLoad(false)
                })
                .catch(error => {
                    if (error.response) {
                        message.error(error.response.data.message)
                    }
                    else {
                        message.error(error.message)
                    }
                    setLoad(false)
                })
        }
    }
    useEffect(() => {
        // setIsUsedUp(isUsed)
        // setImg(src)
        if (title1 !== null) {
            setTitle(title1)
        }

        if (writeNoti1 !== null) {
            setWriteNoti(writeNoti1)
        }
    }, [currentPage, title1, writeNoti1])
    const editor = useRef(null);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...'
    }), []);

    // useEffect(() => {
    //     setContent(value)
    // }, [content])
    return (
        <>
            <Button id={`upadate${id}`} variant="primary" onClick={handleShow}>
                <i class="fa-solid fa-pen"></i>
            </Button>
            <Modal id={id} show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông báo</Modal.Title>
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
                    <>

                        {
                            writeNoti !== null &&
                            <>

                                <JoditEditor
                                    ref={editor}
                                    value={writeNoti}
                                    config={
                                        config
                                    }
                                    tabIndex={1}
                                    onBlur={newContent => {
                                        setWriteNoti(newContent)
                                    }}
                                    onChange={newContent => {
                                        setWriteNoti(newContent)
                                    }}
                                />
                            </>
                        }
                    </>
                    {/* <Example value={writeNoti} data={setWriteNoti} /> */}
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

export default UpdateNotiAd