import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SchoolYearComponent } from './school-year/school-year.component';
import { TestsSideNavComponent } from './tests-side-nav/tests-side-nav.component';
import { NewSchoolYearComponent } from './new-school-year/new-school-year.component';

import { TestsSideNavService } from './tests-side-nav/tests-side-nav.service';
import { EditSchoolYearCallComponent } from './school-year/edit-school-year-call/edit-school-year-call.component';
import { CallComponent } from './school-year/call/call.component';
import { NewCallComponent } from './school-year/new-call/new-call.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SchoolYearComponent,
    TestsSideNavComponent,
    NewSchoolYearComponent,
    EditSchoolYearCallComponent,
    CallComponent,
    NewCallComponent
  ],
  exports: [
    SchoolYearComponent,
    TestsSideNavComponent
  ],
  providers: [ TestsSideNavService ]
})
export class TestsModule {}
