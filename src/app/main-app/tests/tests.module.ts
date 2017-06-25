import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DeleteModule } from '../delete/delete.module';
import { NavbarsModule } from '../navbars/navbars.module';
import { SharedModule } from '../../shared/shared.module';
import { TestsRoutingModule } from './tests-routing.module';

import { DeleteTestComponent } from './schoolyear/term/list-tests/delete-test/delete-test.component';
import { EditSchoolYearComponent } from './schoolyear/edit-schoolyear/edit-schoolyear.component';
import { EditTermComponent } from './schoolyear/term/edit-term/edit-term.component';
import { EditTestComponent } from './schoolyear/term/list-tests/edit-test/edit-test.component';
import { ListTestsComponent } from './schoolyear/term/list-tests/list-tests.component';
import { NewTestComponent } from './new-test/new-test.component';
import { TermComponent } from './schoolyear/term/term.component';
import { TestsComponent } from './tests.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { SchoolYearComponent } from './schoolyear/schoolyear.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    TestsRoutingModule,
    NavbarsModule,
    DeleteModule
  ],
  declarations: [
    DeleteTestComponent,
    EditSchoolYearComponent,
    EditTermComponent,
    EditTestComponent,
    ListTestsComponent,
    NewTestComponent,
    SchoolYearComponent,
    TermComponent,
    TestsComponent,
    TestDetailComponent,
  ],
  exports: [
    SchoolYearComponent,
    TestsComponent
  ],
  providers: []
})
export class TestsModule {}
