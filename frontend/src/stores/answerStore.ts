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
      .then(action((result: any) => {
        this.tempAnswers.clear();
        if (result.success) {
          const answers = result.data.answers
          answers.forEach((answer: any) => this.tempAnswers.set(answer._id, answer))
          this.totalPagesCount = result.data.totalPage
          this.totalCount = result.data.totalCount
        } else {
          console.log(result.msg)
        }
      }))
      .catch((err: any) => {        
        if (err && err.response && err.response.status === 404) {
          console.log(err.response.msg);
        }
        throw err;
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
      .then(action(( result: any) => {
        if (result.success) {
          const answer = result.data
          this.tempAnswers.set(answer._id, answer);
          this.setData(answer)
        } else {
          console.log(result.msg);
          
        }
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
      .then((result: any) => {
        if (result.success) {
          const answer = result.data
          this.tempAnswers.set(answer._id, answer);
          this.totalPagesCount = Math.ceil(this.answers.length / LIMIT);
          this.totalCount = this.answers.length;
        } else {
          console.log(result.msg);
        }
      })
      .catch(action((err: any) => {
        if (err.response.status === 404) {
          this.errors = err.response.body.msg;
        }
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
      .then(( result: any ) => {
        if (result.success) {
          const answer = result.data
          this.tempAnswers.set(answer._id, answer)
        } else {
          console.log(result.msg)
        }
      })
      .catch(action((err: any) => {
        if (err.response.status === 404) {
          this.errors = err.response.body.msg
        }
        throw err;
      }))
      .finally(() => {
        this.inProgress = false
      })
  }

  deleteAnswer(id: string) {
    this.tempAnswers.delete(id);
    return agent.Answers.del(id)
      .then((result: any) => {
        if (result.success) {
          const count = result.data
          this.totalCount = count
          this.totalPagesCount = Math.ceil(count / LIMIT)
          if (this.page >= this.totalPagesCount) {
            this.page = this.totalPagesCount - 1
            this.loadAnswers()
          }
        } else {
          console.log(result.msg)
        }    
      })
  }
}

export default new AnswerStore();