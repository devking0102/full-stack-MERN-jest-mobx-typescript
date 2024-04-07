import React from 'react';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import ListErrors from './ListErrors';
import Banner from '../common/Banner';
import commonStore from '@/stores/commonStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditQuestion: React.FC = (props: any) => {
  const { id }: {id: string} = useParams()
  const { questionStore } = useStore()
  const handleTitleChange = (e: any) => questionStore.setTitle(e.target.value);
  const handleContentChange = (e: any) => questionStore.setContent(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    questionStore.updateQuestion()
      .then(() => props.history.push('/question'))
      .catch(() => {});
  };

  const handleBack = (e: any) => {
    e.preventDefault()
    props.history.push('/question')
  }

  useEffect(() => {
    if (!commonStore.user._id) {
      return props.history.push('/')
    } else {
      questionStore.loadQuestion(id)
      questionStore.getAllQuestions();
    }
  }, [questionStore, questionStore]);

  return <Observer>{() => {
    const { title, content, inProgress, errors } = questionStore;

    return (
      <div className="home-page">
        <Banner appName={commonStore.appName} title="Edit Question"/>
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              

              <ListErrors errors={errors} />

              <form onSubmit={handleSubmitForm}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Question Title"
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

export default EditQuestion;