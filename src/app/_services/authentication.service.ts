import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppUser } from '../models/appUser';
import { retry } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
public host2: string = "http://localhost:8080";
public jwt  : string ;
username : string;
roles: Array <string>;
bReturn : any;
rolesArray : [{
  id: any,
  roleName: any
}];


  constructor(private http: HttpClient, private alertService:AlertService) {}

  // login method
    login( username: string, password: string ){
      const data = {
        username,
        password
    };
      return this.http.post(this.host2+"/login",data, { observe:'response'});
   }
  // save token in local storage of the Browser
   saveToken(jwt, username) {
    localStorage.setItem('token',jwt);
    this.jwt = jwt;
    this.parseJWT();
  }
  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.username;
    this.roles = objJWT.roles;
  }

  public isAdmin():boolean{
    return(sessionStorage.getItem("userType")=="1");
  }

  public isSystemMonitoring():boolean{
    return(sessionStorage.getItem("idFarm")!=null && this.isAuthenticated());
  }

  // method to find out if connected user is an Administrator
  public setRoleSession() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('token')
  })
  this.http.get(this.host2+'/useradmin',{headers: headers } ).pipe(
    retry(1),
  ).subscribe((data: {}) => {
    this.bReturn = data;
    if(this.bReturn == true ){
      sessionStorage.setItem("userType","1");
    } else {
      sessionStorage.setItem("userType","0");
    }
  },
  (err) => {console.log(err)
  this.alertService.error(err);
  });
}


  isUser(){
    return this.roles.indexOf('USER')>=0;
  }


  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  logout() {
    localStorage.removeItem('token');
    //sessionStorage.removeItem('appUserFs');
    //sessionStorage.removeItem('appUserLs');
    //sessionStorage.removeItem('systemUrl');
    //sessionStorage.removeItem('appUserID');
    sessionStorage.clear();
    localStorage.clear();
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  public isAuthenticated(): boolean {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  public getConnectedUser() :AppUser   {
    let respObj : any;  //Object to get the JSON Object
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    if(this.isAuthenticated()){
     this.http.get(this.host2+'/getconnecteduser',{headers: headers } )
     .subscribe((response) => {
      respObj = response;
      let appUser = new AppUser(respObj.id,respObj.password,respObj.first_name,respObj.last_name,respObj.email,respObj.username);
      sessionStorage.setItem('appUserID',(appUser.id).toString());
      sessionStorage.setItem('username',appUser.username);
      sessionStorage.setItem('appUserFs',appUser.first_name);
      sessionStorage.setItem('appUserLs',appUser.last_name);
      this.setRoleSession();
      return appUser;
    });
   
  }else {
  return null;}
}

// Method to call directly from Service to display the Connected User
public showCurrentUsername() {
    if (sessionStorage.getItem('appUserFs') && sessionStorage.getItem('appUserLs')){
      let firstName = sessionStorage.getItem('appUserFs');
      let lastName = sessionStorage.getItem('appUserLs');
     return firstName+" "+lastName;
    } else return "";
}
}