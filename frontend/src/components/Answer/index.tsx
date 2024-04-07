import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from '../../store';
import AnswerList from "./AnswerList";
import Banner from "../common/Banner";

const Answer: React.FC = (props: any) => {
  const { answerStore, commonStore } = useStore();
  const handleSetPage = (page: number) => {
    answerStore.setPage(page);
    answerStore.loadAnswers();
  };
  
  const handleDelete = (id: string) => {
    answerStore.deleteAnswer(id)
  }

  useEffect(() => {
    if (!commonStore.user._id) {
      return props.history.push('/')
    } else {
      answerStore.loadAnswers();
    }
  }, [answerStore]);


  return <Observer>{() => {
    const {
      answers,
      isLoading,
      page,
      totalPagesCount
    } = answerStore;

    return (
      <div className="page">
        <Banner appName={commonStore.appName} title={commonStore.getUserName() + "' Answers"}/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AnswerList
                answers={answers}
                isLoading={isLoading}
                totalPagesCount={totalPagesCount}
                currentPage={page}
                onSetPage={handleSetPage}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }}</Observer>
};

export default Answer;
