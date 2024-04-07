import React from 'react';
import { Link } from 'react-router-dom';

const QuestionActions: React.FC<any> = props => {
  const question = props.question;
  const handleDelete = () => props.onDelete(question._id);

    return (
      <span>

        <Link
          to={`/question/${question._id}`}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="ion-edit" /> Edit Question
        </Link>

        <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleDelete}>
          <i className="ion-trash-a" /> Delete Question
        </button>

      </span>
    );
};

export default QuestionActions;
