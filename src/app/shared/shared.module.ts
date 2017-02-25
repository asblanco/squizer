import { NgModule, ModuleWithProviders }  from '@angular/core';
import { CommonModule }                   from '@angular/common';

import { NavbarComponent }      from './navbar/navbar.component';
import { CourseService }        from './db/course.service';
// simulates communication with the remote server. Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './db/in-memory-data.service';

@NgModule({
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    InMemoryWebApiModule,
    NavbarComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CourseService,
        InMemoryDataService
      ]
    };
  }
}
