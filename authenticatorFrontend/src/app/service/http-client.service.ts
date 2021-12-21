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
  // adds the user 
  addUser(user: User) {
    return this.httpclient.post<User>('http://localhost:8080/add', user);
  }
  // updates the users 
  updateUser(user: User) {
    return this.httpclient.put<User>('http://localhost:8080/update', user);
  }
  // deletes the user
  deleteUser(id: Number){
    return this.httpclient.delete<void>('http://localhost:8080/delete/' + id);
  }

}
