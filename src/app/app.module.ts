import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { LoadingComponent } from './components/loading/loading.component';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from './components/customers/components.component';
import { UsersComponent } from './components/users/users.component';
import { MenuFloatComponent } from './components/menu-float/menu-float.component';
 
 
 
 
@NgModule({
  declarations: [
    AppComponent  ,
     LoadingComponent,
    LoginComponent,
    StartComponent, 
    CustomersComponent, 
    UsersComponent,
    MenuFloatComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ROUTES , 
    FormsModule,
    CommonModule, 
    RouterModule
  ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
