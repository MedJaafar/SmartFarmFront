import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { ErrorInterceptor } from './_services/error-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { ConnectSystemComponent } from './connect-system/connect-system.component';
import { ConnectionService } from './_services/connection.service';
import { AuthGuardAdmin } from './guards/admin.guard.service';
import { CreateUserService } from './_services/create-user.service';
import { AccessForbiddenComponent } from './access-forbidden/access-forbidden.component';
import { LoginAuthGuard } from './guards/login.guard';
import { StatusTableComponent } from './status-table/status-table.component';
import { StatusTableService } from './_services/status-table.service';
import { MapComponent } from './map/map.component';
import { DataResolver } from './_resolvers/data.resolver';
import { LoadingComponent } from './loading/loading.component';
import { SystemParametersComponent } from './system-parameters/system-parameters.component';
import { SystemParametersService } from './_services/system-parameters.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    CreateUserComponent,
    ConnectSystemComponent,
    AccessForbiddenComponent,
    StatusTableComponent,
    MapComponent,
    LoadingComponent,
    SystemParametersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthGuardAdmin,
    LoginAuthGuard,
    AlertService,
    AuthenticationService,
    ConnectionService,
    CreateUserService,
    StatusTableService,
    DataResolver,
    SystemParametersService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
