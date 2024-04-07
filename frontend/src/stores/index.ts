import commonStore, { CommonStore } from './commonStore';
import usersStore, { UsersStore } from './usersStore';
import questionStore, { QuestionStore } from './questionStore';
import answerStore, { AnswerStore } from './answerStore';

export type RootStore = {
  commonStore: CommonStore;
  questionStore: QuestionStore;
  answerStore: AnswerStore;
  usersStore: UsersStore;
}

const rootStore: RootStore = {
  commonStore,
  questionStore,
  answerStore,
  usersStore
};

export default rootStore;