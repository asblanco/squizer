import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule }         from '@angular/common';

import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/course', pathMatch: 'full' },
  { path: 'course',  component: CoursesComponent },
  { path: 'course/:id', component: CoursesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
