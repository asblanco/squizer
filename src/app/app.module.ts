import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { CoursesModule }    from './courses/courses.module';
import { SharedModule }     from './shared/shared.module';

import * as $ from 'jquery';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    CoursesModule,
    SharedModule.forRoot(),
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
