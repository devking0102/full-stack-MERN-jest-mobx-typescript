import QuestionPreview from './QuestionPreview';
import ListPagination from '../common/ListPagination';
import LoadingSpinner from '../common/LoadingSpinner';
import React from 'react';
import { Link } from 'react-router-dom';

const QuestionList: React.FC<any> = props => {
  if (props.isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  const NoQuestion = () => {
    if (props.questions.length === 0) {
      return (
        <h4 className="question-preview text-center text-danger">
          No questions are here... yet.
        </h4>  
      );
    }
    return null;
  };

  return (
    <div>
      <div className='mb-3 pull-right'>
      <Link
          to={`/question/create`}
          className="btn btn-outline-danger"
        >
          <i className="ion-edit" /> Create Question
        </Link>
      </div>
      <NoQuestion />  
      {
        props.questions.map((question: any) => {
          return (
            <QuestionPreview question={question} key={question._id} onDelete={props.onDelete}/>
          );
        })
      }

      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default QuestionList;
