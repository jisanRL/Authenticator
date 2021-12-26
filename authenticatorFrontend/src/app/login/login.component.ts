import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { FormBuilder } from '@angular/forms';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  pullUser: User = new User();
  token: any;
  loggedIn: any;

  // messeages 
  msg: String = ""
  msg1: String = ""
  msg2: String = ""

  constructor(private httpService: HttpClientService,  private router:Router) { }

  ngOnInit(): void {
  }

  // checks the database and logs in
  login() {
    let username = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

    if (username.length == 0 && password.length == 0) {
      this.msg = "Leave no field blank";
    } else if(username.length == 0) {
      this.msg1 = "Don't leave username blank"
    } else if (password.length == 0){
      this.msg2 = "Don't leave password blank"
    }
    else {
      let check;
      this.httpService.getUserName(username).subscribe(
        (response) => {
          let check = JSON.stringify(response);
          let users = JSON.parse(check);

          if (users.username == username && users.password == password) {
            this.genAndSaveUserToken(check);
            let checker = localStorage.getItem("redirect");
            if (checker) {
              localStorage.removeItem("redirect");
              this.router.navigate(["/profile"]);
            } else {
              this.router.navigate([""]);
            }
          } else {
            alert("Incorrect Username or Password");
          }
        }
      );

      // check the database against the input values  [TESTING]
     /*
      if (username == "admin" && password == "admin") {
        this.router.navigate(['/', 'admin']);
      } else if(username == "sam" && password == "sam") {
        this.router.navigate(['/', 'home']);
      } else {
        this.msg = "User not found"
      }
      */
    }
  }
  genAndSaveUserToken(user: any) {
    let obuser = JSON.parse(user);
    this.httpService.saveToken(obuser.type);
    this.httpService.saveUser(user);
  }
  checksession() {
    this.token = this.httpService.getToken();
    this.httpService.signOut();
  }
  logOut() {
    this.httpService.signOut();
    window.location.reload();
  }
  handleUser(response: any) {
    this.httpService = response;
  }
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

}
