import { NgModule, ModuleWithProviders }  from '@angular/core';
import { CommonModule }                   from '@angular/common';

import { NavbarsComponent } from './navbars/navbars.component';
import { SideNavComponent } from './navbars/side-nav/side-nav.component';
import { DeleteComponent }  from './modals/delete/delete.component';
import { NewComponent }     from './modals/new/new.component';

import { CourseService }    from './db/course.service';
import { ChapterService }   from './db/chapter.service';
import { QuestionService }  from './db/question.service';
import { AnswerService }    from './db/answer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarsComponent,
    SideNavComponent,
    DeleteComponent,
    NewComponent
  ],
  exports: [
    NavbarsComponent,
    DeleteComponent,
    NewComponent
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
