> ### Node.js + ExpressJS + MongoDB + TypeScript codebase (CRUD, advanced patterns, etc)

## Getting started

To get the backend running locally:

- `npm install` to install all req'd dependencies
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