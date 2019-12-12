import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';
import { CreateUserService } from '../_services/create-user.service';
import { NewUser } from '../models/NewUser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  Systems : any = [];
  mode:number = 1;
  newUser:NewUser=new NewUser();
  getUser: any;
  systemId:any;
 
  constructor(public connService : ConnectionService, private alertService : AlertService, private createUserService :CreateUserService) {}

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

  public onSaveNewUser(dataForm: NewUser){
    if(sessionStorage.getItem("valid") === "1"){
      this.newUser=dataForm;
      if(this.newUser!=undefined){
      this.newUser.systemId =localStorage.getItem("selectedSystem");
      this.createUserService.saveNewUser(this.newUser)
      .subscribe((response)=>{
      this.getUser=response;
      console.log(response);
      this.mode= 2 ;
    },
    (err) => {
      this.alertService.error(err);
    });
  }}
 }

}
