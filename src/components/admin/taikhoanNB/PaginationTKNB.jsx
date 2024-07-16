import React from 'react'

function PaginationTKNB({ totalPosts, currentPage, PostsPerPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / PostsPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className='pagination' style={{ border: 'none' }}>
            {
                pages.map((item, index) => (
                    <a className={`rounded ${currentPage === index + 1 ? 'active' : ''}`} style={{ border: 'none' }} key={index} onClick={() => setCurrentPage(item)}>{item}</a>
                ))
            }
        </div>
    )
}

export default PaginationTKNB