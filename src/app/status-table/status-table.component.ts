import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusTableService } from '../_services/status-table.service';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.css']
})
export class StatusTableComponent implements OnInit {

  constructor(private statutTableService :StatusTableService,
    private connService : ConnectionService,private alertService : AlertService) { }
  pageStatus : any ;
  motCle : number =0;
  type:number =0;
  currentPage : number=0;
  size : number=10;
  pages : any;
  isChecked : boolean;
  systemFarm : any;

  ngOnInit() {
    this.doSearch(0,0);
    this.getSystemDetails();
  }

  doSearch(mode:number,type:number){
    this.statutTableService.getFarmStatus(mode,type,this.currentPage,this.size)
    .subscribe((response)=>{
      this.pageStatus = response;
      this.pages=new Array(this.pageStatus.totalPages);
      console.log("total pages :"+this.pageStatus.totalPages);
      })
  }

  gotoPage(i:number){
    if(i=>0 ){
      console.log(this.currentPage);
    this.currentPage=i;
    this.doSearch(this.motCle,this.type);}
  }

public loadStatusHour(){
  this.motCle=0;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadStatusToday(){
  this.motCle=1;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadStatusWeek(){
  this.motCle=2;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadStatusMonth(){
  this.motCle=3;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadAllTypes(){
  this.type = 0;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadUserTypes(){
  this.type = 2;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadSchedulerTypes(){
  this.type = 1;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
}

public loadWateringTypes(){
  this.type = 3;
  this.currentPage = 0;
  this.doSearch(this.motCle,this.type);
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

}
