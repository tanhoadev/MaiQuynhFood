import React from 'react'

function Banner(props) {
    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">{props.title}</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Trang Chủ</a>
                        <h1>{ }</h1>
                    </li>
                    {/* <li class="breadcrumb-item"><a href="#">Pages</a></li> */}
                    <li className="breadcrumb-item active text-white">Giới Thiệu</li>
                </ol>
            </div>
            {/* Single Page Header End */}
        </>

    )
}

export default Banner