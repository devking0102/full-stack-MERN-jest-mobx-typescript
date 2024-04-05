import React from 'react';
import { Link } from 'react-router-dom';

const AnswerActions: React.FC<any> = props => {
  const answer = props.answer;
  const handleDelete = () => props.onDelete(answer._id);

  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${answer._id}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Answer
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
          <i className="ion-trash-a" /> Delete Answer
        </button>

      </span>
    );
  }

  return (
    <span />
  );
};

export default AnswerActions;
