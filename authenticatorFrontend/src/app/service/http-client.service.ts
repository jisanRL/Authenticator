import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

// tokens
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  check: any;

  constructor(private httpclient: HttpClient) { }

  // get users from the database
  getUsers(){
    return this.httpclient.get<User[]>('http://localhost:8080/users');
  }
  //gets users by username
  getUserName(username: string){
    return this.httpclient.get<User>('http://localhost:8080/byuser/' + username);
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
  // signs the user out
  signOut(){
    window.sessionStorage.clear();
  }

  /* for login and registration */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);    // stores data for one session only
  }
  // the any can be string too, check this later
  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }
  // saves the user
  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUserKey(): any{
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }
  public checkToken(): boolean {
    if(sessionStorage.getItem(TOKEN_KEY)) {
      return true;
    } else {
      return false;
    }
  }
  
}
