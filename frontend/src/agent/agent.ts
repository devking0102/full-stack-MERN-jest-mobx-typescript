

import superagentPromise from 'superagent-promise';
import _superagent, { ResponseError, Request, Response } from 'superagent';
import commonStore from '@/stores/commonStore';

const superagent = superagentPromise(_superagent, global.Promise);

// define api root
const API_ROOT = 'http://localhost:5000/api';

const handleErrors = (err: ResponseError) => {
  if (err && err.response) {
    console.log(err);
    
  }
  return err;
};

const responseBody = (res: Response) => res.body;

const requests = {
  del: (url: string) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody),
  get: (url: string) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody),
};

const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`;

const Users = {
  paginate: (page: any, lim = 10) =>
    requests.get(`/user?${limit(lim, page)}`),
};

const Questions = {
  paginate: (page: any, lim = 10) =>
    requests.get(`/question?${limit(lim, page)}`),
  all: () =>
    requests.get(`/question/all`),
  del: (id: string) =>
    requests.del(`/question/${id}`),
  get: (id: string) =>
    requests.get(`/question/${id}`),
  update: (question: any) =>
    requests.put(`/question/${question._id}`, question),
  create: (question: any) =>
    requests.post('/question', question)
};

const Answers = {
  paginate: (page: any, lim = 10) =>
    requests.get(`/answer?${limit(lim, page)}&user=${commonStore.user._id}`),
  byUser: (user: string, page: number) =>
    requests.get(`/answer?user=${user}&${limit(5, page)}`),
  del: (id: string) =>
    requests.del(`/answer/${id}?user_id=${commonStore.user._id}`),
  get: (id: string) =>
    requests.get(`/answer/${id}`),
  update: (answer: any) =>
    requests.put(`/answer/${answer._id}`, answer),
  create: (answer: any) =>
    requests.post('/answer', answer)
};

const agent = {
  Questions,
  Users,
  Answers,
};

export default agent;
