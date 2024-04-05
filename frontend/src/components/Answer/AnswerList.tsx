import AnswerPreview from './AnswerPreview';
import ListPagination from '../common/ListPagination';
import LoadingSpinner from '../common/LoadingSpinner';
import React from 'react';

const AnswerList: React.FC<any> = props => {
  if (props.loading && props.answers.length === 0) {
    return (
      <LoadingSpinner />
    );
  }

  if (props.answers.length === 0) {
    return (
      <div className="answer-preview">
        No answers are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.answers.map((answer: any) => {
          return (
            <AnswerPreview answer={answer} key={answer._id} />
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
