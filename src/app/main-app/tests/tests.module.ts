import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
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
import { TestsSideNavComponent } from './tests-side-nav/tests-side-nav.component';

import { SharedModule } from '../../shared/shared.module';
import { DeleteModule } from '../delete/delete.module';
import { TestsRoutingModule } from './tests-routing.module';
// import { MaterializeModule } from 'angular2-materialize';
import { TestsService } from './tests.service';
import { ViewTestComponent } from './school-year/call/list-tests/view-test/view-test.component';
import { EditTestComponent } from './school-year/call/list-tests/edit-test/edit-test.component';
import { DeleteTestComponent } from './school-year/call/list-tests/delete-test/delete-test.component';

@NgModule({
  imports: [
    // CommonModule,
    SharedModule,
    // FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // MaterializeModule,
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
    ViewTestComponent,
    EditTestComponent,
    DeleteTestComponent
  ],
  exports: [
    TestsComponent,
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  providers: [ TestsService ]
})
export class TestsModule {}
