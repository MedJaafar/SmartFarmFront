import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SystemParametersService {

  //public host: string = "https://smart-farm-auto-agriculture.herokuapp.com"; 
  public host: string = "http://localhost:8080";
  
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

  public restartSystem(){
    console.log("service");
    const SystemUrl = sessionStorage.getItem('systemUrl');
    return this.http.post(SystemUrl+'/restart_system',null);
  }

  public activatePump(activeDelay :any){
    const SystemUrl = sessionStorage.getItem('systemUrl');
    return this.http.get(SystemUrl+'/activatepump/'+activeDelay);
  }
}
