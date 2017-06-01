import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CallComponent } from './school-year/call/call.component';
import { EditCallComponent } from './school-year/call/edit-call/edit-call.component';
import { EditSchoolYearComponent } from './school-year/edit-school-year/edit-school-year.component';
import { ListTestsComponent } from './school-year/call/list-tests/list-tests.component';
import { NewCallComponent } from './school-year/new-call/new-call.component';
import { NewSchoolYearComponent } from './new-school-year/new-school-year.component';
import { NewTestComponent } from './school-year/call/new-test/new-test.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { TestsComponent } from './tests.component';
import { TestsSideNavComponent } from './tests-sidenav/tests-sidenav.component';

import { SharedModule } from '../../shared/shared.module';
import { DeleteModule } from '../delete/delete.module';
import { TestsRoutingModule } from './tests-routing.module';
import { TestDetailComponent } from './school-year/call/list-tests/test-detail/test-detail.component';
import { EditTestComponent } from './school-year/call/list-tests/edit-test/edit-test.component';
import { DeleteTestComponent } from './school-year/call/list-tests/delete-test/delete-test.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    TestsRoutingModule,
    DeleteModule
  ],
  declarations: [
    CallComponent,
    EditCallComponent,
    EditSchoolYearComponent,
    ListTestsComponent,
    NewCallComponent,
    NewSchoolYearComponent,
    NewTestComponent,
    SchoolYearComponent,
    TestsSideNavComponent,
    TestsComponent,
    TestDetailComponent,
    EditTestComponent,
    DeleteTestComponent
  ],
  exports: [
    TestsComponent,
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  providers: []
})
export class TestsModule {}
