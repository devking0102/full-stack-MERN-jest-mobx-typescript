import { observable, action, computed, makeObservable } from 'mobx';
import agent from '../agent/agent';
import commonStore from './commonStore';

const LIMIT = 10;

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birth: string;
}

export class UsersStore {
  tempUsers = observable.map();
  isLoading = false;
  page = 0;
  totalPagesCount = 0;
  currentUser?: User;
  loadingUser?: boolean;

  constructor() {
    makeObservable(this, {
      tempUsers: observable,
      users: computed,
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      setPage: action,
      loadUsers: action,
    });
  }

  get users() {
    const ret = []
    const values = this.tempUsers.values();
    for (let value of values) {
      ret.push(value);
    }
    return ret;
  }

  setPage(page: number) {
    this.page = page;
  }

  loadUsers() {
    this.isLoading = true;
    return agent.Users.all(this.page, LIMIT)
      .then(action((users: any) => {
        this.tempUsers.clear();
        users.forEach((user: any) => this.tempUsers.set(user._id, user));
        this.totalPagesCount = Math.ceil(users.length / LIMIT);
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  selectUser(id: string) {
    this.currentUser = this.tempUsers.get(id)
    localStorage.setItem('user', JSON.stringify(this.currentUser))
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    commonStore.user = user
    commonStore.setAppLoaded()
    return user
  }
}

export default new UsersStore();
