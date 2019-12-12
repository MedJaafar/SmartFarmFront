import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'q';
import { Observable } from 'rxjs';
import { FarmSystem } from '../models/FarmSystem';

@Injectable({
  providedIn: 'root'
})
export class StatusTableService {

  public host: string = "http://localhost:8080";   // TODO Change this url on cloud load.

  constructor(private http: HttpClient) { }

  //Méthode du service qui retourne un object oservable, l'appel est fait dans ngUnit() dans le Component
  getFarmStatus(motCle:number,type:number,page:number,size:number){
    //localhost:8080
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
  return this.http.get(this.host+"/getstatuspage?timeMode="+motCle+"&type="+type+"&size="+size+"&page="+page,{headers: headers});
  }


  getFarmStatusMonth(timeMode:number){ 
    //localhost:8080
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })
    let idSystem = sessionStorage.getItem("idFarm");
    let selectedHours = sessionStorage.getItem("selectedHours");
  return this.http.get<any>(this.host+"/getStatusChart?timeMode="+timeMode+"+&selectedHours="+selectedHours+"&idSystem="+idSystem,{headers: headers});
  }

}
