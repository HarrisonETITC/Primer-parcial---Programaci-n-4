import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  url:string = "https://localhost:7110/api/";
  
  async getAll(Controller: string) {
    let response = this.http.get(this.url+Controller);

    return response;
  }
}
