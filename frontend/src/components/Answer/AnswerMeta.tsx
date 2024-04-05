import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AnswerActions from './AnswerActions';


const AnswerMeta = observer((props: any) => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt="" />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <AnswerActions canModify={props.canModify} article={article} onDelete={props.onDelete} />
    </div>
  );
});

export default AnswerMeta;
