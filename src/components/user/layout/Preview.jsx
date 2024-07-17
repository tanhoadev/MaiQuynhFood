import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';

function Preview({ writeNoti1, title1, setData, id, currentPage }) {
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
            // UpdateNoti({ dataNoti, id })
            //     .then(data => {
            //         setData(data)
            //         message.success('Cập nhật thành công')
            //         handleClose()
            //         setLoad(false)
            //     })
            //     .catch(error => {
            //         if (error.response) {
            //             message.error(error.response.data.message)
            //         }
            //         else {
            //             message.error(error.message)
            //         }
            //         setLoad(false)
            //     })
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

    return (
        <>
            <Button id={`upadate${id}`} variant="primary" onClick={handleShow}>
                <i class="fa-solid fa-eye"></i>
            </Button>
            <Modal id={id} show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton style={{ fontWeight: 'bold' }}>
                    {title}
                </Modal.Header>
                <Modal.Body>
                    <>
                        {
                            writeNoti !== null &&
                            <>
                                <div dangerouslySetInnerHTML={{ __html: writeNoti }} />
                            </>
                        }
                    </>
                    {/* <Example value={writeNoti} data={setWriteNoti} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Preview