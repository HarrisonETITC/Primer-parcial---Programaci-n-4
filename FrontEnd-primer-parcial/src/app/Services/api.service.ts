import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  url:string = "https://localhost:7110/api/";
  
  async getAll(Controller: string) {
    let response: any;
    await this.http.get(this.url+Controller).toPromise().then(res=>{
      response = res;
    });

    return response;
  }
}
