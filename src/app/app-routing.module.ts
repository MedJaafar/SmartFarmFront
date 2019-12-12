import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConnectSystemComponent } from './connect-system/connect-system.component';
import { AuthGuardAdmin } from './guards/admin.guard.service';
import { AccessForbiddenComponent } from './access-forbidden/access-forbidden.component';
import { LoginAuthGuard } from './guards/login.guard';
import { StatusTableComponent } from './status-table/status-table.component';
import { MapComponent } from './map/map.component';
import { DataResolver } from './_resolvers/data.resolver';
import { LoadingComponent } from './loading/loading.component';
import { SystemParametersComponent } from './system-parameters/system-parameters.component';

const routes: Routes = [
  {path: "", component:LoginComponent,canActivate :[LoginAuthGuard] },
  {path: "login", component:LoginComponent,canActivate :[LoginAuthGuard] },
  {path: "dashboard/:timeMode", component:DashboardComponent,canActivate: [AuthGuard], resolve: {
    resolver : DataResolver} },
  {path: "create-user",component:CreateUserComponent,canActivate: [AuthGuardAdmin]}, 
  {path:"connect-system",component:ConnectSystemComponent,canActivate: [AuthGuard]},
  {path:"access-forbidden",component:AccessForbiddenComponent},
  {path:"status-table",component:StatusTableComponent, canActivate: [AuthGuard]},
  {path:"map-localisation",component:MapComponent, canActivate: [AuthGuard]},
  {path:"loading-data",component:LoadingComponent, canActivate: [AuthGuard]},
  {path:"parameters-system",component:SystemParametersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ,FormsModule]
})
export class AppRoutingModule { }
