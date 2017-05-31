import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

const coursesRoutes: Routes = [
  { path: '', redirectTo: '/manage-courses', pathMatch: 'full' },
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'course/:courseId', component: CourseComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(coursesRoutes) ],
  exports: [ RouterModule ]
})
export class CoursesRoutingModule {}
