import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from '../models/NewUser';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  public host: string = "https://smartfarmdashboard.cfapps.io"; //"http://localhost:8080";   // TODO Change this url on cloud load.
  constructor(private http:HttpClient) { }

  saveNewUser(newUser:NewUser){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    return this.http.post(this.host+"/register",newUser,{headers: headers });
  }
}
