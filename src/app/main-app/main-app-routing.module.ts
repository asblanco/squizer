import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { CoursesComponent } from './courses/courses.component';
import { TestsComponent } from './tests/tests.component';
import { NewTestComponent } from './tests/new-test/new-test.component';
import { SchoolYearComponent } from './tests/school-year/school-year.component';
import { ViewTestComponent } from './tests/view-test/view-test.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      { path: 'manage-courses', component: CoursesComponent },
      {
        path: 'manage-tests',
        component: TestsComponent,
        children: [
          { path: '', component: SchoolYearComponent },
          { path: 'new-test/:callId', component: NewTestComponent },
          { path: 'test/:id', component: ViewTestComponent }
        ]
      },
      { path: '', redirectTo: '/app/manage-tests', pathMatch: 'full' },
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
