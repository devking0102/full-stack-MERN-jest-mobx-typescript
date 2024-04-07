import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent/agent'
import commonStore from './commonStore'

const LIMIT = 10

export class AnswerStore {
  isLoading = false
  page = 0
  totalCount = 0
  totalPagesCount = 0
  tempAnswers = observable.map()
  id = ''
  title = ''
  content = ''
  question_id = ''
  inProgress = false
  errors = undefined

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalCount: observable,
      totalPagesCount: observable,
      tempAnswers: observable,
      id: observable,
      title: observable,
      content: observable,
      question_id: observable,
      inProgress: observable,
      errors: observable,
      answers: computed,
      setPage: action,
      loadAnswers: action,
      loadAnswer: action,
      createAnswer: action,
      updateAnswer: action,
      deleteAnswer: action
    });
  }

  get answers() {
    const ret = []
    const values = this.tempAnswers.values();
    for (let value of values) {
      ret.push(value);
    }
    return ret;
  }

  clear() {
    this.tempAnswers.clear();
    this.page = 0;
  }

  setData(answer: any) {
    this.setId(answer._id)
    this.setTitle(answer.title)
    this.setContent(answer.content)
    this.setQuestionId(answer.question._id)
    this.errors = undefined
  }

  initializeData() {
    this.setId('')
    this.setTitle('')
    this.setContent('')
    this.setQuestionId('')
    this.errors = undefined
  }

  setId(id: string) {
    this.id = id
  }

  setTitle(title: string) {
    this.title = title
  }

  setContent(content: string) {
    this.content = content
  }

  setQuestionId(question_id: string) {
    this.question_id = question_id
  }

  getAnswer(id: string) {
    return this.tempAnswers.get(id);
  }

  setPage(page: number) {
    this.page = page;
  }

  loadAnswers() {
    this.isLoading = true;
    return agent.Answers.paginate(this.page, LIMIT)
      .then(action(({answers, totalCount, totalPage}: {answers: any, totalCount: number, totalPage: number}) => {
        this.tempAnswers.clear();
        answers.forEach((answer: any) => this.tempAnswers.set(answer._id, answer));
        this.totalPagesCount = totalPage;
        this.totalCount = totalCount;
      }))
      .catch((err: any) => {
        console.log(err);
        
      })
      .finally(action(() => { this.isLoading = false; }));
  }

  loadAnswer(id: string) {
    const answer = this.getAnswer(id);
    if (answer) {
      this.setData(answer)
    };
    this.isLoading = true;
    return agent.Answers.get(id)
      .then(action(( answer: any) => {
        this.tempAnswers.set(answer._id, answer);
        this.setData(answer)
        return answer;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  createAnswer() {
    this.inProgress = true
    this.errors = undefined
    const data = {
      title: this.title,
      content: this.content,
      question_id: this.question_id,
      user_id: commonStore.user?._id
    }
    return agent.Answers.create(data)
      .then((answer:any) => {
        this.tempAnswers.set(answer._id, answer);
        return answer;
      })
      .catch(action((err: any) => {
        this.errors = err.response.text;
        throw err;
      }))
      .finally(() => {
        this.inProgress = false
      })
  }

  updateAnswer() {
    this.inProgress = true
    this.errors = undefined
    const data = {
      _id: this.id,
      title: this.title,
      content: this.content,
      question_id: this.question_id,
      user_id: commonStore.user?._id
    }
    return agent.Answers.update(data)
      .then(( answer: any ) => {
        this.tempAnswers.set(answer._id, answer);
        return answer;
      })
      .catch(action((err: any) => {
        this.errors = err.response.text;
        throw err;
      }))
      .finally(() => {
        this.inProgress = false
      })
  }

  deleteAnswer(id: string) {
    this.tempAnswers.delete(id);
    return agent.Answers.del(id)
  }
}

export default new AnswerStore();