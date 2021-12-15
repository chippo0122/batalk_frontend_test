import React from 'react'
import './index.scss'

export default function QuestionItem(props) {
    const { title, view_count, answer_count, is_answered, score, link, owner } = props.item;

    const scoreClass = score < 0 ? 'text-danger p-2' : '';
    let answerClass = answer_count > 0 ? 'text-success border border-3 border-success p-2' : '';

    if(is_answered) {
        answerClass = 'text-light bg-success p-2';
    }

    return (
        <div className='question-item border-bottom border-secondary py-3'>
            <div className="row g-0">
                <div className="col-8 col-md-10">
                    <a href={link} target="_blank" rel="noreferrer">
                        <h5 className='fs-3  word-wrap'>{title}</h5>
                    </a>
                    <div className="info-board">
                        <div className="info-board-item">
                            <p className='text-danger'>Score</p>
                            <p className={scoreClass}>{score}</p>
                        </div>
                        <div className="info-board-item">
                            <p className='text-danger'>Answered</p>
                            <p className={answerClass}>{answer_count}</p>
                        </div>
                        <div className="info-board-item">
                            <p className='text-danger'>Viewed</p>
                            <p className='p-2'>{view_count}</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md-2">
                    <img className='profile-img' src={owner.profile_image} alt="profile-img" />
                    <h3 className='fs-6 text-center word-wrap'>{owner.display_name}</h3>
                </div>
            </div>
        </div>
    )
}
