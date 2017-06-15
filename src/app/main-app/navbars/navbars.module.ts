import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { CoursesSideNavComponent } from './courses-sidenav/courses-sidenav.component';
import { TestsSideNavComponent } from './tests-sidenav/tests-sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewSchoolYearComponent } from './tests-sidenav/new-schoolyear/new-schoolyear.component';
import { NewTermComponent } from './tests-sidenav/new-term/new-term.component';
import { NewCourseComponent } from './courses-sidenav/new-course/new-course.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CoursesSideNavComponent,
    NavbarComponent,
    NewSchoolYearComponent,
    NewTermComponent,
    TestsSideNavComponent,
    NewCourseComponent
  ],
  exports: [
    CoursesSideNavComponent,
    NavbarComponent,
    TestsSideNavComponent
  ],
  providers: []
})
export class NavbarsModule { }
