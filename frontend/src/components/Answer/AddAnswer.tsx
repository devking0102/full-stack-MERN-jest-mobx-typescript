import React from 'react';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import ListErrors from './ListErrors';
import Banner from '../common/Banner';
import commonStore from '@/stores/commonStore';
import { useEffect } from 'react';

const AddAnswer: React.FC = (props: any) => {
  const { answerStore, questionStore } = useStore()
  const handleTitleChange = (e: any) => answerStore.setTitle(e.target.value);
  const handleContentChange = (e: any) => answerStore.setContent(e.target.value);
  const handleQuestionIdChange = (e: any) => answerStore.setQuestionId(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    answerStore.createAnswer()
      .then(() => props.history.push('/answer'))
      .catch(() => {});
  };

  const handleBack = (e: any) => {
    e.preventDefault()
    props.history.push('/answer')
  }

  useEffect(() => {
    if (!commonStore.user._id) {
      return props.history.push('/')
    } else {
      questionStore.getAllQuestions();
      answerStore.initializeData()
    }
  }, [questionStore, commonStore]);

  return <Observer>{() => {
    const { title, content, question_id, inProgress, errors } = answerStore;

    return (
      <div className="home-page">
        <Banner appName={commonStore.appName} title="Create Answer"/>
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              

              <ListErrors errors={errors} />

              <form onSubmit={handleSubmitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <select name="question_id" id="question_id" className='form-control form-control-lg' onChange={handleQuestionIdChange} value={question_id}>
                      <option value="">Select Question</option>
                      {questionStore.questions.map((question: any) => {
                          return (
                            <option value={question._id} key={question._id}>{question.title}</option>  
                          )
                      })}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Answer Title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Content"
                      value={content}
                      onChange={handleContentChange}
                    />
                  </fieldset>
                  
                  <div className='d-flex justify-content-between'>
                    <button
                      className="btn btn-lg btn-primary pull-xs-left"
                      type="submit"
                      disabled={inProgress}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-lg btn-outline-info pull-xs-right"
                      type="button"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }}</Observer>
};

export default AddAnswer;