import React from 'react'
import './index.scss'

export default function Tag(props) {
    const {children, getTags, currentTag} = props;

    let tagClass = `tag ${currentTag === children ? 'tag-active' : ''}`

    return (
        <button onClick={() => {getTags(children)}} className={tagClass}>
            {children}
        </button>
    )
}
