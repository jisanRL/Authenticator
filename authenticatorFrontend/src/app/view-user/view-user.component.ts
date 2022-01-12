import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: User = new User();

  constructor(private httpService: HttpClientService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("viewUser")!);

  }

}
