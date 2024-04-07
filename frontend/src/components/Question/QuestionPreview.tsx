import React from 'react';
import { Observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuestionActions from './QuestionActions';

const QuestionPreview: React.FC<any> = props => {
  return <Observer>{() => {
    const { question } = props;

    return (
      <div className="question-preview bg-primary-subtle bg-opacity-25 mb-3 p-3 rounded-2">
        <div className="question-meta">
          <h3 className='text-dark blockquote'>Title: {question.title}</h3>

          <div className="info">
            <p className='text-secondary fs-20'>content: {question.content}</p>
            <div className='d-flex justify-content-between'>
              <QuestionActions onDelete={props.onDelete} question={question}/>
              <span className="date text-info-emphasis pull-right">
                {new Date(question.created_at).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }}</Observer>
};


export default QuestionPreview;