import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/manage-tests'},
  {
    path: '',
    component: MainAppComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/manage-tests'},
      {
        path: 'manage-courses',
        loadChildren: './courses/courses.module#CoursesModule',
      },
      {
        path: 'manage-tests',
        loadChildren: './tests/tests.module#TestsModule',
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
