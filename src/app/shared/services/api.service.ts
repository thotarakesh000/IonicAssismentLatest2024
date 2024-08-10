import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getValidateUser(data: users) {
    return this.http.post(environment.baseurl + "users", data)
  }
  getUserData() {
    return this.http.get<users[]>(environment.baseurl + "users")
  }
}
