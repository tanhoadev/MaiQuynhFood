import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchModal() {
    const [data, setData] = useState()
    const [name, setName] = useState()
    const navigate = useNavigate()
    useEffect(() => {

    }, [])
    const handleSearch = () => {
        if (name) {
            navigate(`cuahang?name=${name}`)
            setName('')
            const x = document.querySelector(`#closeeee`)
            if (x) {
                x.click()
            }
        }
        else {
            navigate(`cuahang`)
            const x = document.querySelector(`#closeeee`)
            if (x) {
                x.click()
            }
        }
    }
    return (
        <>
            {/* Modal Search Start */}
            <div
                className="modal fade"
                id="searchModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Tìm Kiếm
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id='closeeee'
                            />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input
                                    type="search"
                                    className="form-control p-3"
                                    placeholder="...."
                                    aria-describedby="search-icon-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button id="search-icon-1" className="input-group-text p-3" onClick={handleSearch}>
                                    <i className="fa fa-search" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
        </>
    )
}

export default SearchModal