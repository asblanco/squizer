import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CallComponent } from './school-year/call/call.component';
import { EditCallComponent } from './school-year/call/edit-call/edit-call.component';
import { EditSchoolYearComponent } from './school-year/edit-school-year/edit-school-year.component';
import { ListTestsComponent } from './school-year/call/list-tests/list-tests.component';
import { NewCallComponent } from './school-year/new-call/new-call.component';
import { NewSchoolYearComponent } from './new-school-year/new-school-year.component';
import { NewTestComponent } from './new-test/new-test.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { TestsComponent } from './tests.component';
import { TestsSideNavComponent } from './tests-side-nav/tests-side-nav.component';

import { SharedModule } from '../shared/shared.module';
import { TestsSideNavService } from './tests-side-nav/tests-side-nav.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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
    TestsComponent
  ],
  exports: [
    TestsComponent,
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  providers: [ TestsSideNavService ]
})
export class TestsModule {}
