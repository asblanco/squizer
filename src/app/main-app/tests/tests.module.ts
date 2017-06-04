import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TermComponent } from './schoolyear/term/term.component';
import { EditTermComponent } from './schoolyear/term/edit-term/edit-term.component';
import { EditSchoolYearComponent } from './schoolyear/edit-schoolyear/edit-schoolyear.component';
import { ListTestsComponent } from './schoolyear/term/list-tests/list-tests.component';
import { NewTermComponent } from './schoolyear/new-term/new-term.component';
import { NewSchoolYearComponent } from './new-schoolyear/new-schoolyear.component';
import { NewTestComponent } from './schoolyear/term/new-test/new-test.component';
import { SchoolYearComponent } from './schoolyear/schoolyear.component';
import { TestsComponent } from './tests.component';
import { TestsSideNavComponent } from './tests-sidenav/tests-sidenav.component';

import { SharedModule } from '../../shared/shared.module';
import { DeleteModule } from '../delete/delete.module';
import { TestsRoutingModule } from './tests-routing.module';
import { TestDetailComponent } from './schoolyear/term/list-tests/test-detail/test-detail.component';
import { EditTestComponent } from './schoolyear/term/list-tests/edit-test/edit-test.component';
import { DeleteTestComponent } from './schoolyear/term/list-tests/delete-test/delete-test.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    TestsRoutingModule,
    DeleteModule
  ],
  declarations: [
    TermComponent,
    EditTermComponent,
    EditSchoolYearComponent,
    ListTestsComponent,
    NewTermComponent,
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
