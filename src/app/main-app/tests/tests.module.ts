import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { SharedModule }     from '../shared/shared.module';
import { TestsComponent }   from './tests.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    TestsComponent
  ],
  exports: [ TestsComponent ],
  providers: []
})
export class TestsModule { }
