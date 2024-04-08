import React from 'react';
import { Observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.min.css'
import AnswerActions from './AnswerActions';
import { useState } from 'react';

const AnswerPreview: React.FC<any> = props => {
  const [showMore, setShowMore] = useState(false)
  return <Observer>{() => {
    const { answer } = props;
    const toggleShowMore = (e: any) => {
      e.preventDefault()
      setShowMore(!showMore)
    }
    return (
      <div className="answer-preview bg-info bg-opacity-25 mb-3 p-3 rounded-2">
        <div className="answer-meta">
          <h3 className='text-dark blockquote text-break'>Title: {answer.title}</h3>

          <div className="info">
            <h5 className="author text-dark-emphasis">
              Author: {answer.user.firstName} {answer.user.lastName}
            </h5>
            {answer.content.length > 200 ? 
              <div>
                <h6 className='text-secondary text-break'>content: {showMore ? answer.content : (answer.content.substr(0, 200) + '...')}</h6>
                <div className='d-flex justify-content-end'>
                  <li className='list-unstyled' onClick={toggleShowMore}>
                    {
                      showMore ? <a href="#">Show less</a> : <a href="#">Show more</a>
                    }
                  </li>
                </div>
              </div> : 
              <div>
                <h6 className='text-secondary text-break'>content: {answer.content}</h6>
              </div>
            }
            <p className='text-success text-break'>Question: {answer.question.title}</p>
            <div className='d-flex justify-content-between'>
              <AnswerActions onDelete={props.onDelete} answer={answer}/>
              <span className="date text-info-emphasis pull-right">
                {new Date(answer.created_at).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }}</Observer>
};


export default AnswerPreview;