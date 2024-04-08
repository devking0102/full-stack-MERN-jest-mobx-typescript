> ### Node.js + ExpressJS + MongoDB + TypeScript codebase (CRUD, advanced patterns, etc)

## Getting started

To get the backend running locally:

- `npm install` to install all required dependencies
- `npm run serve` to start the local server

## Change environment variables
If you want to change server port and mongodb url, simply edit `.env` and change `PORT` and `MONGO_URL` (i.e. `PORT=5000`, `MONGO_URL="mongodb://127.0.0.1:27017/studentQA"`)

## Functionality overview

It uses a custom API for all requests.

**General functionality:**

- CRUD users and paginfor API
- CRUD Questions and pagination for API
- CRUD Answers and pagination for API
- 🏆 Use MongoDB 🏆
- Unit test: Jest
- Error Handling

**The project structure looks like this:**

- controllers
    - user.controller is to control CRUD of users
    - question.controller is to control CRUD of questions
    - answer.controller is to control CRUD of answers
- models
    - User model represents user's schema
    - Question model represents question's schema
    - Answer model represents answer's schema
- routes
    - answer.routes.ts contains routes of CRUD of answers
    - question.routes.ts contains routes of CRUD of questions
    - user.routes.ts contains routes of CRUD of users
- services
    - answer.service.ts contains db operation of CRUD of answers using mongoose
    - question.service.ts contains db operation of CRUD of questions using mongoose
    - user.service.ts contains db operation of CRUD of users using mongoose

## Reoutes
- /api/user
    GET: get paginated users
        params: no params
        return: { users, totalCount, totalPage }
    POST: create new user
        params: user = { email, firstName, lastName, gender, birth }
        return: new user = { _id, email, firstName, lastName, gender, birth }
- /api/user/:id
    GET: get a user by id
        params: id
        return: user = { _id, email, firstName, lastName, gender, birth }
    PUT: update user
        params: id, user = {email, firstName, lastName, gender, birth}
        return: user = { _id, email, firstName, lastName, gender, birth }
    DELETE: delete a user by id
        params: id
        return: 'user deleted'
- /api/question/all
    GET: get all questions
        params: no params
        return: Array of all questions
- /api/question
    GET: get paginated questions
        params: no params
        return: { questions, totalCount, totalPage }
    POST: create new question
        params: question = { title, content, user(ObjectId) }
        return: new question = { _id, title, content, user(Object), created_at }
- /api/question/:id
    GET: get a question by id
        params: id
        return: question = { _id, title, content, user(Object), created_at }
    PUT: update question
        params: id, question = { _id, title, content, user(ObjectId), created_at }
        return: question = { _id, title, content, user(Object), created_at }
    DELETE: delete a question by id
        params: id
        return: 'question deleted'
- /api/answer
    GET: get paginated answers
        params: no params
        return: { answers, totalCount, totalPage }
    POST: create new answer
        params: answer = { title, content, user_id(ObjectId), question_id(ObjectId) }
        return: new answer = { _id, title, content, user(Object), question(Object) created_at }
- /api/answer/:id
    GET: get a answer by id
        params: id
        return: answer = { _id, title, content, user(Object), question(Object) created_at }
    PUT: update answer
        params: id, answer = { _id, title, content, user(ObjectId), question_id(ObjectId), created_at }
        return: answer = { _id, title, content, user(Object), question(Object) created_at }
    DELETE: delete a answer by id
        params: id
        return: 'answer deleted'

## I/O type
- Input
    It depends on api
- Output
    