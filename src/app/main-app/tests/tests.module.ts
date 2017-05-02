import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SchoolYearComponent } from './school-year/school-year.component';
import { TestsSideNavComponent } from './tests-side-nav/tests-side-nav.component';
import { NewSchoolYearComponent } from './new-school-year/new-school-year.component';

import { TestsSideNavService } from './tests-side-nav/tests-side-nav.service';
import { EditSchoolYearComponent } from './school-year/edit-school-year/edit-school-year.component';
import { CallComponent } from './school-year/call/call.component';
import { NewCallComponent } from './school-year/new-call/new-call.component';
import { EditCallComponent } from './school-year/call/edit-call/edit-call.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CallComponent,
    EditCallComponent,
    EditSchoolYearComponent,
    NewCallComponent,
    NewSchoolYearComponent,
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  exports: [
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  providers: [ TestsSideNavService ]
})
export class TestsModule {}
