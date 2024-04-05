import React from 'react';
import { Link } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';

const ArticlePreview: React.FC<any> = props => {
  const { answerStore } = useStore();

  return <Observer>{() => {
    const { answer } = props;

    return (
      <div className="answer-preview">
        <div className="answer-meta">
          <Link to={`/@${answer.author.username}`}>
            <img src={answer.author.image} alt="" />
          </Link>

          <div className="info">
            <Link className="author" to={`/@${answer.author.username}`}>
              {answer.author.username}
            </Link>
            <span className="date">
            {new Date(answer.createdAt).toDateString()}
          </span>
          </div>

        </div>

        <Link to={`/answer/${answer.slug}`} className="preview-link">
          <h1>{answer.title}</h1>
          <p>{answer.description}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {
              answer.tagList.map((tag: string) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                )
              })
            }
          </ul>
        </Link>
      </div>
    );
  }}</Observer>
};


export default ArticlePreview;