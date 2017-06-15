import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'course/:courseId', component: CourseComponent },
      { path: 'course', redirectTo: '/manage-courses', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(coursesRoutes) ],
  exports: [ RouterModule ]
})
export class CoursesRoutingModule {}
