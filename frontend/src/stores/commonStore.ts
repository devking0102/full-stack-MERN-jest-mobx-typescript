import { observable, action, reaction, makeObservable } from 'mobx';

export class CommonStore {

  appName = 'Q & A';
  appLoaded = false;
  user = JSON.parse(localStorage.getItem('user') || '{}')
  constructor() {
    makeObservable(this, {
      appName: observable,
      user: observable,
      appLoaded: observable,
      setUser: action,
      setAppLoaded: action
    });
  }

  setUser(user: object | null) {
    this.user = user;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }

  getUserName() {
    if (!!this.user && this.user._id) {
      return this.user.firstName + ' ' + this.user.lastName
    } else {
      return ''
    }
  }

}

export default new CommonStore();