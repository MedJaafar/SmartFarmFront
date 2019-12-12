import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { AppUser } from './models/appUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  title = 'SmartFarmFront';
  
  constructor( public authService : AuthenticationService, private router : Router){
  
    
  }
  
  isAdmin(){
    return this.authService.isAdmin();
  }

  isUser(){
    return this.authService.isUser();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();

  }

  isSysteMonitoring(){
    return this.authService.isSystemMonitoring();
  }

  goToDashboard(){
    this.router.navigateByUrl('/loading-data', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/3']);
      localStorage.setItem("selectedCheck","3");
   }); 
  }
  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
