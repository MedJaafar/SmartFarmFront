import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FarmSystem} from 'src/app/models/FarmSystem';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { SystemUrl } from '../models/SystemUrl';
import { ConnectionSystem } from '../models/ConnectionSystem';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  
 // public host: string = "https://smart-farm-auto-agriculture.herokuapp.com";
 public host: string = "http://localhost:8080";
   
  constructor(private http: HttpClient) { }

   // test URL method -> PiServer is not secured this is why we dont use HEADERS
  testSystemURL( systemURL: string, systemCode: string, idUserConnected : string): Observable<ConnectionSystem> {
  return this.http.get<ConnectionSystem>(systemURL+"/test_system/"+systemCode+"/"+idUserConnected )
  .pipe(
    retry(1),
  )
 }

  // HttpClient API get() method => Fetch employees list
  getCurrentSystems(): Observable<FarmSystem> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    return this.http.get<FarmSystem>(this.host+'/getusersystems',{headers: headers })
    .pipe(
      retry(1),
    )
  }

   // Get SYSTEM TO MONITOR
   getCurrentSystemMonitor(): Observable<FarmSystem> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
   var idSystem = sessionStorage.getItem("idFarm")
    return this.http.get<FarmSystem>(this.host+'/getcurrentsystem/'+idSystem,{headers: headers })
    .pipe(
      retry(1),
    )
  }

  // Load current url after choosing the system to monitor
  getCurrentUrlSystem( systemID : String): Observable<SystemUrl> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    return this.http.get<SystemUrl>(this.host+'/getcurrenturl/'+systemID,{headers: headers})
    .pipe(
      retry(1),
    )
  }
}
