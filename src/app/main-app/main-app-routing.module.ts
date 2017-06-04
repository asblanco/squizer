import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'manage-courses',
        loadChildren: './courses/courses.module#CoursesModule',
      },
      {
        path: 'manage-tests',
        loadChildren: './tests/tests.module#TestsModule',
      },
      { path: '', pathMatch: 'full', redirectTo: '/manage-tests'}
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
