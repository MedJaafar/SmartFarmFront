import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConnectSystemComponent } from './connect-system/connect-system.component';

const routes: Routes = [
  { path: "login", component:LoginComponent },
  { path: "dashboard", component:DashboardComponent,canActivate: [AuthGuard] },
  {path: "create-user",component:CreateUserComponent},
  {path:"connect-system",component:ConnectSystemComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ,FormsModule]
})
export class AppRoutingModule { }
