import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MainAppModule } from './main-app/main-app.module';
import { AppComponent } from './app.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import * as $ from 'jquery';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    MainAppModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
