import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { CallComponent } from './tests/school-year/call/call.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { TestsComponent } from './tests/tests.component';
import { NewTestComponent } from './tests/school-year/call/new-test/new-test.component';
import { SchoolYearComponent } from './tests/school-year/school-year.component';
import { ViewTestComponent } from './tests/school-year/call/list-tests/view-test/view-test.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'manage-courses',
        component: CoursesComponent,
        children: [
          { path: 'course/:courseId', component: CourseComponent }
        ]
      },
      {
        path: 'manage-tests',
        component: TestsComponent,
        children: [
          {
            path: 'school-year/:syId',
            component: SchoolYearComponent,
            children: [
              { path: 'call/:callId', component: CallComponent },
            ]
          },
          { path: 'school-year/:syId/call/:callId/new-test', component: NewTestComponent },
          { path: 'school-year/:syId/call/:callId/test/:id', component: ViewTestComponent }
        ]
      },
      { path: '', redirectTo: '/manage-tests', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainAppRoutingModule {}
