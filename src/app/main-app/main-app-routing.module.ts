import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { CoursesComponent } from './courses/courses.component';
import { SchoolYearComponent } from './tests/school-year/school-year.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'manage-tests', component: SchoolYearComponent },
          { path: 'manage-courses', component: CoursesComponent },
          { path: '', redirectTo: '/app/manage-tests', pathMatch: 'full' },
        ]
      }
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
