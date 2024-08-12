import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // userList: users[] = [];
  constructor() { }
  async setStorage(key, value) {
    return await Preferences.set({
      key: key,
      value: value,
    });
  }

  async getStorage(key) {
    return await new Promise((resolve, reject) => {
      Preferences.get({ key: key }).then((val) => {
        if (val.value) {
          resolve(JSON.parse(val.value))
        }
        else {
          resolve(null)

        }
      })
    })

  }
  getName(key: string): any {
    return Preferences.get({ key: key });

  };
  setName(key: any, value: any) {
    Preferences.set({
      key: key,
      value: value,
    });
  };
  removeName(key) {
    return Preferences.remove({ key });
  };
}
