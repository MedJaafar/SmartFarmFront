import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from '../models/NewUser';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  //public host: string = "https://smart-farm-auto-agriculture.herokuapp.com";
  public host: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  saveNewUser(newUser:NewUser){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    return this.http.post(this.host+"/register",newUser,{headers: headers });
  }
}
