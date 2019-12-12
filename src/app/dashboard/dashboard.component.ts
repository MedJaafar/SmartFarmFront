import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';
import {Chart} from 'chart.js';
import { StatusTableService } from '../_services/status-table.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(private connectionService : ConnectionService, private alertService : AlertService
  , private dataService : StatusTableService,private route: ActivatedRoute,private router: Router) { }

  systemFarm :any;
  statusList:any;
  selectedHour:any;
  title = 'Tempreture - Air Humidity';
  LineChart=[];
  BarChart=[];
  PieChart=[];
  //Data Charts
  dateList=[];
  dataTempreture=[];
  dataHumidity=[];
  // WATERING DATA
  wateringData=[];
  wateringVolume =[];
  moisitureData =[];
  wateringDateList=[];
  // Filtrs
  modeFilter : number = 0;
  //
  actionIsSelected : any;

 // ngOnInit() {
 //    this.getSystemDetails();
 // }

    // Data Details Using Resolver 
    public getStatusChartData(){
      return this.route.data.subscribe((data:[any]) => {
        this.statusList = data;
        this.dataHumidity = [];
        this.dataTempreture = [];
        this.dateList = [];
        this.wateringVolume =[];
        this.wateringDateList=[];
        this.moisitureData=[];
        
        this.statusList.resolver[1].forEach(element => {
          this.dataTempreture.push(element.valTempreture);
          this.dataHumidity.push(element.valHumidityAir);
          this.dateList.push(element.dateInsertionStr);
        });
        //WATERING
        this.statusList.resolver[3].forEach(element => {
          this.wateringVolume.push(element.volume);
          this.wateringDateList.push(element.date);
          this.moisitureData.push(element.moisitureAvg);
        });
        this.wateringData = this.statusList.resolver[0];
        // System Details
      this.systemFarm = this.statusList.resolver[2];
      document.getElementById('systemNameSpan').textContent = this.systemFarm.systemName;
      sessionStorage.setItem("systemName",this.systemFarm.systemName);
      sessionStorage.setItem("longitude",this.systemFarm.localisation[1]);
      sessionStorage.setItem("latitude",this.systemFarm.localisation[0]);
      // END System DETAILS
      },
      (err) => {console.log(err)
      this.alertService.error(err);});
      }

    // Data details
      
  ngOnInit()
  {
  this.selectedHour =sessionStorage.getItem("selectedHours");
  this.getStatusChartData();
     // Line chart:
this.LineChart = new Chart('lineChart', {
  type: 'line',
data: {
 labels: this.dateList,
 datasets: [{
     label: 'Temperature °C',
     data: this.dataTempreture,
     fill:false,
     lineTension:0.2,
     borderColor:"red",
     borderWidth: 1
 },
 {
  label: 'Air Humidity %',
  data: this.dataHumidity,
  fill:false,
  lineTension:0.2,
  borderColor:"blue",
  borderWidth:1,
}]
}, 
options: {
 title:{
     text:"Line Chart",
     display:false
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});
//
this.LineChart = new Chart('barChart', {
  type: 'line',
data: {
 labels: this.wateringDateList,
 datasets: [{
     label: 'Water Volume (Litters)',
     data: this.wateringVolume,
     fill:true,
     backgroundColor :'#aea6d8',
     lineTension:0.2,
     borderColor:"rgb(64, 54, 124)",
     borderWidth: 2
 }]
}, 
options: {
 title:{
     text:"Water Consumption Chart",
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});

// Bar chart:

this.LineChart = new Chart('lineChartMoisiture', {
  type: 'line',
data: {
 labels: this.wateringDateList,
 datasets: [{
     label: 'Moisiture Level %',
     data: this.moisitureData,
     fill:true,
     backgroundColor :'#669900',
     lineTension:0.2,
     borderColor:"#336600",
     borderWidth: 2
 }]
}, 
options: {
 title:{
     text:"Soil Moisiture Chart",
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});


  }
    // Chart
    public ifFunction() : boolean{
      return (this.LineChart.length<0 && this.LineChart == undefined) ;
    }

    public loadStatusChartToday(){
      this.router.navigateByUrl('/loading-data', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/1']);
      localStorage.setItem("selectedCheck","1");
    }); 
    }

    public loadStatusChartMonth(){
      this.router.navigateByUrl('/loading-data', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/3']);
        localStorage.setItem("selectedCheck","3");
     }); 
  }

  loadStatusChartWeek(){
    this.router.navigateByUrl('/loading-data', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/2']);
      localStorage.setItem("selectedCheck","2");
   }); 
  }

  public checkselected() : string{
    return localStorage.getItem("selectedCheck")
  }

  reloardHours(value :string) {
    sessionStorage.setItem("selectedHours",value);
    this.selectedHour =sessionStorage.getItem("selectedHours");
    this.router.navigateByUrl('/loading-data', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/'+this.checkselected()]);
     // localStorage.setItem("selectedCheck","2");
   }); 
  }

}
