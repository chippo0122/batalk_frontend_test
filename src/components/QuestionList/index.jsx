import React, {useEffect} from 'react'
import QuestionItem from './QuestionItem'
import { useSelector, useDispatch } from 'react-redux';
import { requestQuestionList } from '../../redux/questionList';

export default function QuestionList() {
    //redux
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questionList.items);
    const { currentPage, hasmore } = useSelector(state => state.questionList);
    const currentTag = useSelector(state => state.tags.currentTag);

    useEffect(() => {
        dispatch(requestQuestionList({
            tags: '',
            page: 1
        }))
    }, [])

    return (
        <div className='question-list'>
            {
                questions.length > 0 ?
                    questions.map(el => {
                        return (
                            <QuestionItem key={el.question_id + el.creation_date} item={el} />
                        )
                    }) :
                    ''
            }
            {
                questions.length > 0 ?
                    (hasmore ?
                        <button
                            onClick={() => {
                                dispatch(requestQuestionList({
                                    tags: currentTag,
                                    page: currentPage + 1,
                                    callByScroll: true
                                }))
                            }}
                            className='btn btn-sm btn-success d-block w-100'>Load More</button> :
                        <p className='text-center'>No more</p>
                    ) :
                    ''
            }
        </div>
    )
}
