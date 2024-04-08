> ### React + Mobx + TypeScript codebase (CRUD, advanced patterns, etc)

## Getting started

To get the frontend running locally:

- `yarn install` to install all required dependencies
- `yarn start` to start the local server (this project uses create-react-app)


### Making requests to the backend API

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `localhost:5000/api`)


## Functionality overview

It uses a custom API for all requests.

**General functionality:**

- *R** users (only select user)
- CRUD Questions
- CRUD Answers

**The general page breakdown looks like this:**

- Home(Users) page (URL: /#/ )
    - List of users
    - Pagination for list of users
- Question page (URL: /#/question )
    - Only access this page when you select user in Users Page
    - Create question button to create question (question title and content)
    - Edit question button to edit question
    - Delete question button to delete question
- Question add/edit page (URL: /#/question/create, /#/question/:questionObjectId )
    - Only access this page when you select user in Users Page
    - Save question button to save question (question title and content)
    - Back button to back to question page
- Answer page (URL: /#/answer )
    - Only access this page when you select user in Users Page
    - Create answer button to create answer (answer title and content)
    - Edit answer button to edit answer
    - Delete answer button to delete answer
- answer add/edit page (URL: /#/answer/create, /#/answer/:answerObjectId )
    - Only access this page when you select user in Users Page
    - Select question what you would answer
    - Save answer button to save answer (answer title, content and question)
    - Back button to back to answer page
