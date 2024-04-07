import AnswerPreview from './AnswerPreview';
import ListPagination from '../common/ListPagination';
import LoadingSpinner from '../common/LoadingSpinner';
import React from 'react';
import { Link } from 'react-router-dom';

const AnswerList: React.FC<any> = props => {
  if (props.isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  const NoAnswer = () => {
    if (props.answers.length === 0) {
      return (
        <h4 className="answer-preview text-center text-danger">
          No answers are here... yet.
        </h4>  
      );
    }
    return null;
  };

  return (
    <div>
      <div className='mb-3 pull-right'>
      <Link
          to={`/answer/create`}
          className="btn btn-outline-danger"
        >
          <i className="ion-edit" /> Create Answer
        </Link>
      </div>
      <NoAnswer />  
      {
        props.answers.map((answer: any) => {
          return (
            <AnswerPreview answer={answer} key={answer._id} onDelete={props.onDelete}/>
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

export default AnswerList;
