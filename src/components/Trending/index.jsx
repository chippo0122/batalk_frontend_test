import React, {useEffect} from 'react'

import Tag from './Tag'

export default function Trending(props) {
    const {getTags, tags, currentTag} = props;

    useEffect(() => {
        getTags()
    }, []);

    return (
        <div className='trending pt-2'>
            <h2 className='fs-2 text-dark'>Trending</h2>
            <div className='tags-sec'>
                {
                    tags ?
                    tags.map(el => {
                        return (
                            <Tag getTags={getTags}
                                 currentTag={currentTag}
                                 key={el.name}
                            >{el.name}</Tag>
                        )
                    }) :
                    ''
                }
            </div>
        </div>
    )
}
