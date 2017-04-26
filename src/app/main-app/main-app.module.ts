import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesModule } from './courses/courses.module';
import { TestsModule }   from './tests/tests.module';
import { SharedModule }  from './shared/shared.module';
import { MainAppRoutingModule }  from './main-app-routing.module';

import { MainAppComponent }     from './main-app.component';
import { NavbarComponent }  from './navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { TestsComponent }   from './tests/tests.component';

@NgModule({
  imports: [
    CommonModule,
    CoursesModule,
    TestsModule,
    SharedModule.forRoot(),
    MainAppRoutingModule
  ],
  declarations: [
    MainAppComponent,
    NavbarComponent
  ],
  exports: [
    MainAppComponent,
    NavbarComponent
  ],
  providers: []
})
export class MainAppModule { }
