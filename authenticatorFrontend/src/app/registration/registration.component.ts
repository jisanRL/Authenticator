import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { User } from '../model/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  users: User[] = [];

  loginForm: any;
  pullUser: User = new User();
  token: any;
  loggedIn: any;
  currentUser: any;
  
  constructor(private httpService: HttpClientService,  private router:Router) { }

  ngOnInit(): void {
    this.checkLoginStatus()
  }

  // check if the user is logged in
  checkLoginStatus() {
    if(this.httpService.checkToken()) {
      this.loggedIn = 1;    // user is logged in 
      this.currentUser = this.httpService.getUserKey();
      console.log("the current user is = " + this.currentUser);
      this.router.navigate(['']);
    } else {
      this.loggedIn = 0;    // user is not logged in
      this.httpService.getUsers().subscribe(
        (response) => {
          this.users = response;
        } 
      )
      
    }
  }

  addUser(addForm: NgForm): void {
    // addForm.value.type = '';
    this.httpService.saveToken("");
    this.httpService.saveUser(addForm.value);
    console.log(addForm.value);

    this.httpService.addUser(addForm.value).subscribe(
      (response: User) => {
        alert("Registration successful!\nEnter username and password to login");
        // console.log(response);
        // this.router.navigate(['/profile']);
        // this.loggedIn = 1;    // user is logged in 
        // this.currentUser = this.httpService.getUserKey();
      }
    );
    let check = localStorage.getItem("redirect");
    if (check) {
      localStorage.removeItem("redirect");
      // this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
