import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg: String = "";
  isLoggedIn = false;
  username: String = "";
  users : User[] = [];

  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.httpClientService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.httpClientService.getUserKey();
      this.username = user.username;
    }
  }

  viewStr() {
     
  }

}
