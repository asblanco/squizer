/* Feature Module */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesComponent,
    SideNavComponent
  ],
  exports: [ CoursesComponent ],
  providers: []
})
export class CoursesModule { }
