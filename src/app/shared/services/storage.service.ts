import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setStorage(key, value) {
    return Preferences.set({
      key,
      value
    });
  }

  getStorage(key) {
    return Preferences.get({ key });
  }
  removeName(key) {
    return Preferences.remove({ key });
  };
}
