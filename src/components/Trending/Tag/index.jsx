import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { requestTags } from '../../../redux/tags';
import { requestQuestionList } from '../../../redux/questionList';
import { setLoadingStatus } from '../../../redux/loadingStatus';

import './index.scss'

export default function Tag(props) {
    //redux
    const dispatch = useDispatch();
    const currentTag = useSelector(state => state.tags.currentTag);
    //props
    const { children } = props;
    //func
    const goSearch = async () => {
        dispatch(setLoadingStatus(true));
        const res = await dispatch(requestTags(children));
        if (res) {
            const { currentTag } = res.payload;
            dispatch(requestQuestionList({
                tags: currentTag,
                page: 1
            }));
            dispatch(setLoadingStatus(false));
        }
    }

    let tagClass = `tag ${currentTag === children ? 'tag-active' : ''}`

    return (
        <button onClick={goSearch} className={tagClass}>
            {children}
        </button>
    )
}
