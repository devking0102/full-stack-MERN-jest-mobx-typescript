import { observable, action, computed, makeObservable } from 'mobx';
import agent from '../agent/agent';

const LIMIT = 10;

export class QuestionStore {
  isLoading = false;
  page = 0;
  totalPagesCount = 0;
  tempQuestions = observable.map();

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      tempQuestions: observable,
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

  getQuestion(id: string) {
    return this.tempQuestions.get(id);
  }

  setPage(page: number) {
    this.page = page;
  }

  loadQuestions() {
    this.isLoading = true;
    return agent.Questions.paginate(this.page, LIMIT)
      .then(action(( questions: any) => {
        this.tempQuestions.clear();
        questions.forEach((question: any) => this.tempQuestions.set(question.slug, question));
        this.totalPagesCount = Math.ceil(questions.length / LIMIT);
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  getAllQuestions() {
    return agent.Questions.all()
      .then(action(( questions: any) => {
        this.tempQuestions.clear();
        questions.forEach((question: any) => this.tempQuestions.set(question._id, question));
        this.totalPagesCount = Math.ceil(questions.length / LIMIT);
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  loadQuestion(id: string) {
    const question = this.getQuestion(id);
    if (question) return Promise.resolve(question);
    this.isLoading = true;
    return agent.Questions.get(id)
      .then(action(( question: any) => {
        this.tempQuestions.set(question._id, question);
        return question;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  createQuestion(question: any) {
    return agent.Questions.create(question)
      .then((question:any) => {
        this.tempQuestions.set(question._id, question);
        return question;
      })
  }

  updateQuestion(data: any) {
    return agent.Questions.update(data)
      .then(( question: any ) => {
        this.tempQuestions.set(question._id, question);
        return question;
      })
  }

  deleteQuestion(id: string) {
    this.tempQuestions.delete(id);
    return agent.Questions.del(id);
  }
}

export default new QuestionStore();