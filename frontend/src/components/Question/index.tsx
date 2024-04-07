import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from '../../store';
import QuestionList from "./QuestionList";
import Banner from "../common/Banner";

const Question: React.FC = (props: any) => {
  const { questionStore, commonStore } = useStore();
  const handleSetPage = (page: number) => {
    questionStore.setPage(page);
    questionStore.loadQuestions();
  };
  
  const handleDelete = (id: string) => {
    questionStore.deleteQuestion(id)
  }

  useEffect(() => {
    if (!commonStore.user._id) {
      return props.history.push('/')
    } else {
      questionStore.loadQuestions();
    }
  }, [questionStore]);


  return <Observer>{() => {
    const {
      questions,
      isLoading,
      page,
      totalPagesCount
    } = questionStore;

    return (
      <div className="page">
        <Banner appName={commonStore.appName} title="Questions"/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QuestionList
                questions={questions}
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

export default Question;
