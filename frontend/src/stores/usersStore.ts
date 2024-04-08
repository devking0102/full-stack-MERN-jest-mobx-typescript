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
  totalCount = 0;
  currentUser?: User;
  loadingUser?: boolean;

  constructor() {
    makeObservable(this, {
      tempUsers: observable,
      users: computed,
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      totalCount: observable,
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
    return agent.Users.paginate(this.page, LIMIT)
      .then(action(( result: any ) => {
        if (result.success) {
          const { users, totalPage, totalCount} = result.data
          this.tempUsers.clear();
          users.forEach((user: any) => this.tempUsers.set(user._id, user));
          this.totalPagesCount = totalPage;
          this.totalCount = totalCount
        } else {
          console.log(result.msg)
        }
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  selectUser(id: string) {
    this.currentUser = this.tempUsers.get(id)
    const user = {
      _id: this.currentUser?._id,
      email: this.currentUser?.email,
      firstName: this.currentUser?.firstName,
      lastName: this.currentUser?.lastName,
      gender: this.currentUser?.gender,
      birth: this.currentUser?.birth,
    }
    localStorage.setItem('user', JSON.stringify(user))
    commonStore.setUser(user)
    return Promise.resolve(this.currentUser)
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    this.currentUser = user
    commonStore.setUser(user)
    commonStore.setAppLoaded()
    return user
  }
}

export default new UsersStore();
