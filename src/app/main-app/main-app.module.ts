import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesModule } from './courses/courses.module';
import { TestsModule } from './tests/tests.module';

import { DbModule } from './db/db.module';
import { MainAppRoutingModule } from './main-app-routing.module';

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
  providers: []
})
export class MainAppModule {}
