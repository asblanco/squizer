import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

/* App Root */
import { AppComponent }     from './app.component';
import { NavbarComponent }  from './navbar/navbar.component';

/* Courses imports */
import { CoursesModule }    from './courses/courses.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoursesModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
