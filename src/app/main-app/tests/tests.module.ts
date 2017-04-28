import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TestsComponent } from './tests.component';
import { TestsSideNavComponent } from './tests-side-nav/tests-side-nav.component';
import { NewSchoolYearComponent } from './new-school-year/new-school-year.component';

import { TestsSideNavService } from './tests-side-nav/tests-side-nav.service';
import { EditDeleteSchoolYearComponent } from './edit-delete-school-year/edit-delete-school-year.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TestsComponent,
    TestsSideNavComponent,
    NewSchoolYearComponent,
    EditDeleteSchoolYearComponent
  ],
  exports: [ TestsComponent ],
  providers: [ TestsSideNavService ]
})
export class TestsModule {}
