import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '../model/Test';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpclient:HttpClient) { }

  // get tester
  getStr() {
    return this.httpclient.get('http://localhost:8080/somestr')
  }
}
