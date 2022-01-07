import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  editUser: User = new User();
  deleteUser: User = new User();
  loggedIn: any;
  currentUser: any;

  constructor(private httpService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
    this.accessCheck();
    this.checkLoginStatus();
  }

  // if the user is not an employee/admin then he wont be able to get into this component and page
  accessCheck(){
    let check = this.httpService.getToken();
    if (check != "Employee" && check != "admin" && check != "customer") {
      alert("Illegal Access");
      this.router.navigate(['']);
    } else {}
  }

  // check if the user is logged in
  checkLoginStatus() {
    if(this.httpService.checkToken()) {
      this.loggedIn = 1;    // user is logged in 
      this.currentUser = JSON.parse(this.httpService.getUserKey());
      console.log("the current user is = " + this.currentUser);
    } else {
      this.loggedIn = 0;    // user is not logged in
    }
  }
  

}
