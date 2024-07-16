import React from 'react'

function PaginationComment({ totalPosts, currentPage, PostsPerPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / PostsPerPage); i++) {
        pages.push(i)
    }
    return (
        <>
            <div className="col-12">
                <div className="pagination d-flex justify-content-center mt-5">
                    {
                        pages.map((item, index) => (
                            <a className={`rounded ${currentPage === index + 1 ? 'active' : ''}`} key={index} onClick={() => setCurrentPage(item)}>{item}</a>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default PaginationComment