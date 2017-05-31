import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MainAppModule } from './main-app/main-app.module';
import { AppComponent } from './app.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModule } from './login/login.module';

import { SimpleNotificationsModule } from 'angular2-notifications';
import * as $ from 'jquery';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LoginModule,
    MainAppModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
