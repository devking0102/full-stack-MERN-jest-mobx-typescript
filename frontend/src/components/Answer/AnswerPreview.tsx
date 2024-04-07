import React from 'react';
import { Observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.min.css'
import AnswerActions from './AnswerActions';

const AnswerPreview: React.FC<any> = props => {
  return <Observer>{() => {
    const { answer } = props;

    return (
      <div className="answer-preview bg-info bg-opacity-25 mb-3 p-3 rounded-2">
        <div className="answer-meta">
          <h3 className='text-dark blockquote'>Title: {answer.title}</h3>

          <div className="info">
            <h5 className="author text-dark-emphasis">
              Author: {answer.user.firstName} {answer.user.lastName}
            </h5>
            <h6 className='text-secondary'>content: {answer.content}</h6>
            <p className='text-success'>Question: {answer.question.title}</p>
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