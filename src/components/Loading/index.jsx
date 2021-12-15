import React from 'react'

import './index.scss'

export default function Loading() {
    return (
        <div className='loading w-100 d-flex justify-content-center align-items-center'>
            <i className="bi bi-gear fs-3 spinner"></i>
        </div>
    )
}
