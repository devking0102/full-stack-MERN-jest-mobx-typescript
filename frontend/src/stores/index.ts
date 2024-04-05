import editorStore, { EditorStore } from './editorStore';
import commonStore, { CommonStore } from './commonStore';
import usersStore, { UsersStore } from './usersStore';
import questionStore, { QuestionStore } from './questionStore';
import answerStore, { AnswerStore } from './answerStore';

export type RootStore = {
  editorStore: EditorStore;
  commonStore: CommonStore;
  questionStore: QuestionStore;
  answerStore: AnswerStore;
  usersStore: UsersStore;
}

const rootStore: RootStore = {
  editorStore,
  commonStore,
  questionStore,
  answerStore,
  usersStore
};

export default rootStore;