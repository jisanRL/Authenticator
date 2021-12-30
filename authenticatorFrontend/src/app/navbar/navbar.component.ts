import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  username: string = '';

  constructor(private httpservice: HttpClientService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.httpservice.getToken();

    if (this.isLoggedIn) {
      const user = this.httpservice.getUserKey();
      console.log("user.username = " + user.username)
      this.username = user.username;      // fix this (this will display the username )
    } 
  }

  logOut(): void{
    this.httpservice.signOut();
    window.location.reload();
  }

}
