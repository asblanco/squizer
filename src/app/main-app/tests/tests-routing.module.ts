import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestsComponent } from './tests.component';
import { SchoolYearComponent } from './schoolyear/schoolyear.component';
import { NewTestComponent } from './schoolyear/term/new-test/new-test.component';
import { TestDetailComponent } from './schoolyear/term/list-tests/test-detail/test-detail.component';
import { TermComponent } from './schoolyear/term/term.component';

const testsRoutes: Routes = [
  {
    path: '',
    component: TestsComponent,
    children: [
      { path: 'schoolyear/:syId/term/:termId/test/:id', component: TestDetailComponent },
      { path: 'schoolyear/:syId/term/:termId/new-test', component: NewTestComponent },
      {
        path: 'schoolyear/:syId',
        component: SchoolYearComponent,
        children: [
          { path: 'term/:termId', component: TermComponent },
          { path: 'term', redirectTo: '/manage-tests', pathMatch: 'full' },
        ]
      },
      { path: 'schoolyear/:syId/term/:termId/test', redirectTo: '/manage-tests', pathMatch: 'full' },
      { path: 'schoolyear', redirectTo: '/manage-tests', pathMatch: 'full' },
      { path: '', pathMatch: 'full', redirectTo: '/manage-tests'}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(testsRoutes) ],
  exports: [ RouterModule ]
})
export class TestsRoutingModule {}
