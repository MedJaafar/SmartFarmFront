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

  constructor(private connService : ConnectionService,
    private alertService : AlertService,
    private parametersService : SystemParametersService) { }

  ngOnInit() {
    this.getSystemDetails();
    this.pumpFlow= this.systemFarm.pumpDebit
  }

  // System Details
public getSystemDetails(){
  return this.connService.getCurrentSystemMonitor().subscribe((data: {}) => {
    this.systemFarm = data;
    console.log(this.systemFarm);
  },
  (err) => {console.log(err)
  this.alertService.error(err);});
  }

  // Enable / Disable Auto Watering
  public toggleEnableWatering(){
    
    this.parametersService.toggleSystemWatering(this.systemFarm.systemID).subscribe((data: {}) => {
      this.systemFarm = data;
      console.log(this.systemFarm);
    },
    (err) => {console.log(err)
    this.alertService.error(err);});
    }
  }



