import React from 'react';
import { Link } from 'react-router-dom';

const AnswerActions: React.FC<any> = props => {
  const answer = props.answer;
  const handleDelete = () => props.onDelete(answer._id);

    return (
      <span>

        <Link
          to={`/answer/${answer._id}`}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="ion-edit" /> Edit Answer
        </Link>

        <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleDelete}>
          <i className="ion-trash-a" /> Delete Answer
        </button>

      </span>
    );
};

export default AnswerActions;
