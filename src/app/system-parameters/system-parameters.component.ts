import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';
import { SystemParametersService } from '../_services/system-parameters.service';

@Component({
  selector: 'app-system-parameters',
  templateUrl: './system-parameters.component.html',
  styleUrls: ['./system-parameters.component.css']
})
export class SystemParametersComponent implements OnInit {

  systemFarm : any;
  pumpFlow : number ;
  activeTime: number;
  checkedActive : boolean = false;
  checkbox = false;
  

  constructor(private connService : ConnectionService,
    private alertService : AlertService,
    private parametersService : SystemParametersService) { }

  ngOnInit() {
    this.getSystemDetails();
    this.activeTime = 5;
  }

  // System Details
public getSystemDetails(){
  return this.connService.getCurrentSystemMonitor().subscribe((data: {}) => {
    this.systemFarm = data;
  },
  (err) =>{
  this.alertService.error(err);});
  }

  // Enable / Disable Auto Watering
  public toggleEnableWatering(){
    if(confirm('If you confirm, Modification will be saved and the FarmSystem will Restart ! Wait for 2 mn before reconnecting.')) {
    this.parametersService.toggleSystemWatering(this.systemFarm.systemID).subscribe((data: {}) => {
      this.systemFarm = data;
      console.log(this.systemFarm);
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
    // Restart the System
    console.log("call Component")
    this.parametersService.restartSystem().subscribe((data: {}) => {
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
      } 
    }

  public async activatePumpManually(){
  
    if(this.systemFarm.bEnableWatering){
    if(confirm('Automatic Watering Is Enabled, Do you want to activate manually the Pump ?')) {
    
    this.parametersService.activatePump(this.activeTime).subscribe((data: {}) => {
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
    }
  }else {
    this.parametersService.activatePump(this.activeTime).subscribe((data: {}) => {
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
      }
    }
  }






