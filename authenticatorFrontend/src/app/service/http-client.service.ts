import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpclient: HttpClient) { }

  // get users from the database
  getUsers(){
    return this.httpclient.get<User[]>('http://localhost:8080/users');
  }
}
