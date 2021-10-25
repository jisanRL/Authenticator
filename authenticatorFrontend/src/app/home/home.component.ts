import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../model/Test';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  test:Test = new Test();
  
  msg: String = "";

  constructor(
    // private httpClientService:HttpClientService
    ) { }

  ngOnInit(): void {
  }

  viewStr() {
    this.test = new Test();
  }

}
