import { observable, action, computed, makeObservable } from 'mobx'
import agent from '../agent/agent'
import commonStore from './commonStore'
import Toast from 'awesome-toast-component'

const LIMIT = 10

let toast = new Toast('Hello World', {position: 'top', theme: 'light'})

export class QuestionStore {
  isLoading = false
  page = 0
  totalCount = 0
  totalPagesCount = 0
  tempQuestions = observable.map()
  id = ''
  title = ''
  content = ''
  inProgress = false
  errors = undefined

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalCount: observable,
      totalPagesCount: observable,
      tempQuestions: observable,
      id: observable,
      title: observable,
      content: observable,
      inProgress: observable,
      errors: observable,
      questions: computed,
      setPage: action,
      loadQuestions: action,
      loadQuestion: action,
      createQuestion: action,
      updateQuestion: action,
      deleteQuestion: action
    });
  }

  get questions() {
    const ret = []
    const values = this.tempQuestions.values();
    for (let value of values) {
      ret.push(value);
    }
    return ret;
  }

  clear() {
    this.tempQuestions.clear();
    this.page = 0;
  }

  setData(question: any) {
    this.setId(question._id)
    this.setTitle(question.title)
    this.setContent(question.content)
    this.errors = undefined
  }

  initializeData() {
    this.setId('')
    this.setTitle('')
    this.setContent('')
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

  getQuestion(id: string) {
    return this.tempQuestions.get(id);
  }

  setPage(page: number) {
    this.page = page;
  }

  loadQuestions() {
    this.isLoading = true;
    return agent.Questions.paginate(this.page, LIMIT)
      .then(action((result: any) => {
        if (result.success) {
          const {questions, totalPage, totalCount} = result.data
          this.tempQuestions.clear()
          questions.forEach((question: any) => this.tempQuestions.set(question._id, question))
          this.totalPagesCount = totalPage
          this.totalCount = totalCount
        } else {
          console.log(result.msg)
        }
      }))
      .catch((err: any) => {
        console.log(err)
        throw err     
      })
      .finally(action(() => { this.isLoading = false; }))
  }

  loadQuestion(id: string) {
    const question = this.getQuestion(id)
    if (question) {
      this.setData(question)
      return question
    } else {
      this.isLoading = true;
      return agent.Questions.get(id)
        .then(action(( result: any) => {
          if (result.success) {
            const question = result.data
            this.tempQuestions.set(question._id, question)
            this.setData(question)
            return question
          } else {
            console.log(result.msg)
          }
        }))
        .finally(action(() => { this.isLoading = false; }));
    }
  }

  getAllQuestions() {
    return agent.Questions.all()
      .then(action(( result: any) => {
        if (result.success) {
          const questions = result.data
          this.tempQuestions.clear()
          questions.forEach((question: any) => this.tempQuestions.set(question._id, question))
          this.totalPagesCount = Math.ceil(questions.length / LIMIT)
        } else {
          console.log(result.msg)
        }        
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  createQuestion() {
    this.inProgress = true
    this.errors = undefined
    const data = {
      title: this.title,
      content: this.content,
      user_id: commonStore.user?._id
    }
    return agent.Questions.create(data)
      .then(action((result: any) => {
        if (result.success) {
          const question = result.data
          this.tempQuestions.set(question._id, question);
          this.totalPagesCount = Math.ceil(this.questions.length / LIMIT);
          this.totalCount = this.questions.length;
          return question;
        } else {
          console.log(result.msg)
        }
      }))
      .catch(action((err: any) => {
        if (err && err.response && err.response.status === 404) {
          this.errors = err.response.body.msg
        }
        throw err;
      }))
      .finally(() => {
        this.inProgress = false
      })
  }

  updateQuestion() {
    this.inProgress = true
    this.errors = undefined
    const data = {
      _id: this.id,
      title: this.title,
      content: this.content,
      user_id: commonStore.user?._id
    }
    return agent.Questions.update(data)
      .then(action(( result: any ) => {
        if (result.success) {
          const question = result.data
          this.tempQuestions.set(question._id, question)
          return question
        } else {
          console.log(result.msg)
        }
      }))
      .catch(action((err: any) => {
        if (err && err.response && err.response.status === 404) {
          this.errors = err.response.body.msg
        }
        throw err;
      }))
      .finally(() => {
        this.inProgress = false
      })
  }

  deleteQuestion(id: string) {
    this.tempQuestions.delete(id);
    return agent.Questions.del(id)
      .then((result: any) => {
        if (result.success) {
          const count = result.data
          this.totalCount = count
          this.totalPagesCount = Math.ceil(count / LIMIT)
          if (this.page >= this.totalPagesCount) {
            this.page = this.totalPagesCount - 1
            this.loadQuestions()
          }
        } else {
          console.log(result.msg)
        }
      })
  }
}

export default new QuestionStore();