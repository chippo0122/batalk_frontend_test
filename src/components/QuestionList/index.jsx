import React from 'react'
import QuestionItem from './QuestionItem'

export default function QuestionList(props) {
    const {questions, getQuestionsList, currentTag, currentPage, hasMore} = props;

    return (
        <div className='question-list'>
            {
                questions.length > 0 ?
                questions.map(el => {
                    return (
                        <QuestionItem key={el.question_id + el.creation_date} item={el}/>
                    )
                }):
                ''
            }
            {
                questions.length > 0 ?
                (hasMore ? 
                <button onClick={() => {getQuestionsList(currentTag, currentPage + 1, true)}} className='btn btn-sm btn-success d-block w-100'>Load More</button> :
                <p className='text-center'>No more</p>
                ):
                ''
            }
        </div>
    )
}
