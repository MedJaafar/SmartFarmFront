import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  username : any;
  password :any;

  constructor(private authService: AuthenticationService
              ,private router:Router
              ,private formBuilder: FormBuilder
              ,private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onLogin(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(resp=>{
      console.log(resp.headers.get('Authorization')); 
      // We get jwt from Network /login response
      let jwt = resp.headers.get('Authorization');
      this.authService.saveToken(jwt,this.f.username.value);
      this.authService.getConnectedUser();
      this.router.navigateByUrl("/connect-system");
      
    }, err=>{
      this.alertService.error(err);
      this.loading = false;
    })

    
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isUser(){
    return this.authService.isUser();
  }

  getCurrentUser(){
    console.log(this.authService.getConnectedUser());
    return this.authService.getConnectedUser();
  }
}
