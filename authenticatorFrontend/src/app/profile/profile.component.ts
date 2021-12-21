import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[] = [];
  editUser: User = new User();
  deleteUser: User = new User();

  constructor(private httpService: HttpClientService) { }

  ngOnInit(): void {
  }

  

}
