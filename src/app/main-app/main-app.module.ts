import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DbModule } from './db/db.module';
import { MainAppRoutingModule } from './main-app-routing.module';
import { MaterializeModule } from 'angular2-materialize'; // Used in dropdown navbar
import { NavbarsModule } from './navbars/navbars.module';

import { CoursesSideNavService } from './navbars/courses-sidenav/courses-sidenav.service';
import { MainAppComponent } from './main-app.component';
import { TestsSideNavService } from './navbars/tests-sidenav/tests-sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NavbarsModule,
    DbModule.forRoot(),
    MaterializeModule,
    MainAppRoutingModule,
  ],
  declarations: [
    MainAppComponent
  ],
  exports: [
    MainAppComponent
  ],
  providers: [
    CoursesSideNavService,
    TestsSideNavService
  ]
})
export class MainAppModule {}
