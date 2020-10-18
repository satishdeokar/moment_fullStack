import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor(
      private router: Router
    ) {

    }
  /**
    * Local Storage Services
    * setLocalStorage will set the localStorage
    * will be stored in string format
    * so we will first convert json to string
    * @param name: name of localStorage object
    * @param data: data supposed to be added to that object
    */
   setLocalStorage(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  /**
    * getLocalStorage will return the localStorage
    * will be returned in json format
    * @param name: name of localStorage object
    */
  getLocalStorage(name: string) {
    return JSON.parse(localStorage.getItem(name));
  }

  /**
   * Helper method to remove the Item from localstorage.
   * @param name
   */
  removeLocalStorageItem(name: string) {
    localStorage.removeItem(name);
  }

  /**
   * clearLocalStorageItem(name: string) method 
   * to clear/remove all the Item from localstorage.
   */
  clearLocalStorageItem() {
    localStorage.clear();
  }

  isTokenExists() {
    if ((this.getLocalStorage('token') && this.getLocalStorage('user'))) {
      return true;
    } else {
      //user/landing
      this.router.navigateByUrl('');
    }
  }

}
