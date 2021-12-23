import React, { useRef } from 'react'

import { useDispatch } from 'react-redux'
import { requestTags } from '../../redux/tags'
import { requestQuestionList } from '../../redux/questionList'
import { setLoadingStatus } from '../../redux/loadingStatus'

import './index.scss'

export default function Searching() {
    const insertSec = useRef();
    const dispatch = useDispatch();

    const goSearch = async () => {
        dispatch(setLoadingStatus(true));
        let { value } = insertSec.current;
        const res = await dispatch(requestTags(value.trim()));
        if (res) {
            const { currentTag } = res.payload;
            dispatch(requestQuestionList({
                tags: currentTag,
                page: 1
            }));
            dispatch(setLoadingStatus(false));
            insertSec.current.value = '';
        }
    }

    return (
        <div className='searching input-group pt-3'>
            <input ref={insertSec} type="text" className="form-control" placeholder='Tags' />
            <button onClick={goSearch} className="btn search-btn">
                Search
            </button>
        </div>
    )
}
