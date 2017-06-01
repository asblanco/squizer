import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesModule } from './courses/courses.module';
import { TestsModule } from './tests/tests.module';
import { DbModule } from './db/db.module';
import { MainAppRoutingModule } from './main-app-routing.module';

import { CoursesSideNavService } from './courses/courses-sidenav/courses-sidenav.service';
import { TestsSideNavService } from './tests/tests-sidenav/tests-sidenav.service';
import { MainAppComponent } from './main-app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DbModule.forRoot(),
    TestsModule,
    CoursesModule,
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
  providers: [
    CoursesSideNavService,
    TestsSideNavService
  ]
})
export class MainAppModule {}
