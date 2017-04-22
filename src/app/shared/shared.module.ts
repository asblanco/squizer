import { NgModule, ModuleWithProviders }  from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { FormsModule }                    from '@angular/forms';

import { NavbarsComponent } from './navbars/navbars.component';
import { SideNavComponent } from './navbars/side-nav/side-nav.component';
import { DeleteComponent }  from './modals/delete/delete.component';
import { NewEditComponent } from './modals/new-edit/new-edit.component';

import { CourseService }    from './db/course.service';
import { ChapterService }   from './db/chapter.service';
import { QuestionService }  from './db/question.service';
import { AnswerService }    from './db/answer.service';

import { ApiConfig }         from './web-api/api-config';
import { ApiEndpointConfig } from './web-api/api-endpoint.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NavbarsComponent,
    SideNavComponent,
    DeleteComponent,
    NewEditComponent
  ],
  exports: [
    NavbarsComponent,
    DeleteComponent,
    NewEditComponent
  ],
  providers: [{
      provide: ApiConfig,
      useValue: ApiEndpointConfig }
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CourseService,
        ChapterService,
        QuestionService,
        AnswerService
      ]
    };
  }
}
