import React from 'react';
import { Observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuestionActions from './QuestionActions';
import { useState } from 'react';

const QuestionPreview: React.FC<any> = props => {
  const [showMore, setShowMore] = useState(false)
  return <Observer>{() => {
    const { question } = props
    const toggleShowMore = (e: any) => {
      e.preventDefault()
      setShowMore(!showMore)
    }
    return (
      <div className="question-preview bg-primary-subtle bg-opacity-25 mb-3 p-3 rounded-2">
        <div className="question-meta">
          <h3 className='text-dark blockquote text-break'>Title: {question.title}</h3>

          <div className="info">
          {question.content.length > 200 ? 
              <div>
                <h6 className='text-secondary text-break'>content: {showMore ? question.content : (question.content.substr(0, 200) + '...')}</h6>
                <div className='d-flex justify-content-end'>
                  <li className='list-unstyled' onClick={toggleShowMore}>
                    {
                      showMore ? <a href="#">Show less</a> : <a href="#">Show more</a>
                    }
                  </li>
                </div>
              </div> : 
              <div>
                <h6 className='text-secondary text-break'>content: {question.content}</h6>
              </div>
            }
            <div className='d-flex justify-content-between'>
              <QuestionActions onDelete={props.onDelete} question={question}/>
              <span className="date text-info-emphasis pull-right">
                {new Date(question.created_at).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }}</Observer>
}

export default QuestionPreview