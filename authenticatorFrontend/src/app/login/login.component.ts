import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: String = ""
  msg1: String = ""
  msg2: String = ""

  // test variables
  user: String = "admin"
  password: String = "admin"

  constructor(private router:Router) { }

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
      // check the database against the input values
      if (username == "admin" && password == "admin") {
        this.router.navigate(['/', 'admin']);
      } else if(username == "sam" && password == "sam") {
        this.router.navigate(['/', 'home']);
      } else {
        this.msg = "User not found"
      }
      
    }
  }

}
