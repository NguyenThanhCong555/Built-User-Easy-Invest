// import { User } from 'store/app/user/types';

type fieldUser = 'isLogin' | 'phoneNumber' | 'password' | 'id' | 'token' | 'role' | 'status' | 'createTime' | 'language';
interface keyReducer {
  user: string;
  profile: string;
  project: string;
  wallet: string;
}

let prefix = '';

class StorageService {
  localStorage;
  sessionStorage;
  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // localStorage
  set(key: string, value: string) {
    this.localStorage.setItem(this.generateKey(key), value);
  }

  get(key: string) {
    return this.localStorage.getItem(this.generateKey(key));
  }

  remove(key: string) {
    this.localStorage.removeItem(this.generateKey(key));
  }

  setObject(key: string, value: object) {
    this.localStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getObject(key: string) {
    return JSON.parse(this.localStorage.getItem(this.generateKey(key)));
  }

  // sessionStorage
  setSession(key: string, value: string) {
    this.sessionStorage.setItem(this.generateKey(key), value);
  }

  getSession(key: string) {
    return this.sessionStorage.getItem(this.generateKey(key));
  }

  setSessionObject(key: string, value: object) {
    this.sessionStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getSessionObject(key: string) {
    return JSON.parse(this.sessionStorage.getItem(this.generateKey(key)));
  }

  generateKey(key: string) {
    // return `${prefix}_${key}`;
    return key;
  }

  // reverse
  reverseToObject(value: string) {
    return JSON.parse(value);
  }

  reverseToString(value: object) {
    return JSON.stringify(value);
  }

  getFieldOfUser(field: fieldUser) {
    const persist = this.get('persist:state');
    if (persist) {
      const persistParse = this.reverseToObject(persist);
      // get storage of user
      const user: Object = this.reverseToObject(persistParse.user);

      return user[field];
    }
    return;
  }

  setFieldOfUser(field: fieldUser, value: any) {
    // get user data
    const persist = this.get('persist:state');
    const persistParse: keyReducer = this.reverseToObject(persist);
    const user: Object = this.reverseToObject(persistParse.user);
    // transition data
    user[field] = value;
    //reverse to string
    const reverseUser = this.reverseToString(user);
    persistParse.user = reverseUser; // assign user
    const reversePersist = this.reverseToString(persistParse);

    // update storage persist
    this.set('persist:state', reversePersist);
  }
}

const Storage = new StorageService();
export default Storage;
