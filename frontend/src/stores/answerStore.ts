import { observable, action, computed, makeObservable } from 'mobx';
import agent from '../agent/agent';

const LIMIT = 10;

export class AnswerStore {
  isLoading = false;
  page = 0;
  totalPagesCount = 0;
  tempAnswers = observable.map();

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      tempAnswers: observable,
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

  getAnswer(id: string) {
    return this.tempAnswers.get(id);
  }

  setPage(page: number) {
    this.page = page;
  }

  loadAnswers() {
    this.isLoading = true;
    return agent.Answers.all(this.page, LIMIT)
      .then(action(( answers: any) => {
        this.tempAnswers.clear();
        answers.forEach((article: any) => this.tempAnswers.set(article.slug, article));
        this.totalPagesCount = Math.ceil(answers.length / LIMIT);
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  loadAnswer(id: string) {
    const answer = this.getAnswer(id);
    if (answer) return Promise.resolve(answer);
    this.isLoading = true;
    return agent.Answers.get(id)
      .then(action(( answer: any) => {
        this.tempAnswers.set(answer._id, answer);
        return answer;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  createAnswer(answer: any) {
    return agent.Answers.create(answer)
      .then((answer:any) => {
        this.tempAnswers.set(answer._id, answer);
        return answer;
      })
  }

  updateAnswer(data: any) {
    return agent.Answers.update(data)
      .then(( answer: any ) => {
        this.tempAnswers.set(answer._id, answer);
        return answer;
      })
  }

  deleteAnswer(id: string) {
    this.tempAnswers.delete(id);
    return agent.Answers.del(id);
  }
}

export default new AnswerStore();