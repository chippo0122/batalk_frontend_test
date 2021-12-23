import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { requestTags } from '../../redux/tags';
import { setLoadingStatus } from '../../redux/loadingStatus';

import Tag from './Tag'

export default function Trending(props) {
    //redux
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags.items);

    useEffect(() => {
        const initData = async () => {
            dispatch(setLoadingStatus(true));
            const res = await dispatch(requestTags());
            if (res) {
                dispatch(setLoadingStatus(false))
            }
        }
        initData();
    }, []);

    return (
        <div className='trending pt-2'>
            <h2 className='fs-2 text-dark'>Trending</h2>
            <div className='tags-sec'>
                {
                    tags.length > 0 ?
                        tags.map(el => {
                            return (
                                <Tag key={el.name}>{el.name}</Tag>
                            )
                        }) :
                        ''
                }
            </div>
        </div>
    )
}
