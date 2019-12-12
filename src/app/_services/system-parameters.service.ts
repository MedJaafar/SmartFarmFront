import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmSystem } from '../models/FarmSystem';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemParametersService {

  public host: string = "http://localhost:8080";   // TODO Change this url on cloud load.

  constructor(private http: HttpClient) {

   }
   
  //  
  public toggleSystemWatering(systemId : string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    return this.http.get(this.host+'/toggleSystemWatering/'+systemId,{headers: headers }).pipe(
      retry(1),
    )
  }
}
