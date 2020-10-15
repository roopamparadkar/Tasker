import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './services/guards/auth.guard';
import { MaterialModule } from '../material.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { WebApiService } from './services/web-services/web-api.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    RegistrationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthenticationService, AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: WebApiService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
