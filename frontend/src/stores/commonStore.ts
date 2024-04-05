import { observable, action, reaction, makeObservable } from 'mobx';
import agent from '../agent/agent';

export class CommonStore {

  appName = 'Student Q&A';
  // token = window.localStorage.getItem('jwt');
  appLoaded = false;

  // tags: string[] = [];
  // isLoadingTags = false;
  user = JSON.parse(window.localStorage.getItem('user') || '{}')

  constructor() {
    makeObservable(this, {
      appName: observable,
      user: observable,
      appLoaded: observable,
      // tags: observable,
      // isLoadingTags: observable,
      // loadTags: action,
      setUser: action,
      setAppLoaded: action
    });

    reaction(
      () => this.user,
      user => {
        if (user) {
          window.localStorage.setItem('user', JSON.stringify(user));
        } else {
          window.localStorage.removeItem('user');
        }
      }
    );
  }

  setUser(user: object | null) {
    this.user = user;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();