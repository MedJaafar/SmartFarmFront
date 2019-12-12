import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';
import {FarmSystem} from 'src/app/models/FarmSystem';
import { SystemUrl } from '../models/SystemUrl';

@Component({
  selector: 'app-connect-system',
  templateUrl: './connect-system.component.html',
  styleUrls: ['./connect-system.component.css']
})
export class ConnectSystemComponent implements OnInit {
  systemPath = "";
  idFarmSystem : string;
  userName : string;
  Systems : any = [];
  systemPathData: any = {};
  
  constructor(public connService : ConnectionService, private alertService : AlertService ) { }
  

  ngOnInit() {
  this.loadSystemsList();
  }
  
   // Get System list for connected user
  public loadSystemsList() {
    return this.connService.getCurrentSystems().subscribe((data: {}) => {
      this.Systems = data;
      console.log(this.Systems);
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
  }

  // On choose the system to monitor from the options list
  public loadSystemUrl(systemID : String){
    return this.connService.getCurrentUrlSystem(systemID).subscribe((data: {}) => {
      this.systemPathData = data;
      console.log(this.systemPathData)
      this.idFarmSystem = this.systemPathData.systemId;
      this.systemPath = this.systemPathData.url;
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
  }

  // MJ - Test the connection between Dashboard app and PI Server App.
  // This stores a connection document in every try.
  public testConnection(){
    //var urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    var valid : boolean = true;
    this.userName = sessionStorage.getItem('username');
    if(this.idFarmSystem == null || this.idFarmSystem == ""){
      document.getElementById("alert-validation").hidden = false;
      valid = false ;
    }
    if(valid === true){
    document.getElementById("alert-validation").hidden = true;
      // Communication with server
    this.connService.testSystemURL(this.systemPath,this.idFarmSystem,this.userName).subscribe((response) => {
    console.log(response);
      // Store url in the SessionStorage after successful connection
    sessionStorage.setItem('systemUrl',this.systemPath);
    sessionStorage.setItem('idFarm',this.idFarmSystem);
    sessionStorage.setItem('selectedHours','17');
    },
    (err) => {console.log(err)
      this.alertService.error(err);});
    }
  }
}
