import { NgModule, ModuleWithProviders }  from '@angular/core';
import { CommonModule }                   from '@angular/common';

import { NavbarComponent }  from './navbar/navbar.component';
import { CourseService }    from './db/course.service';
import { ChapterService }   from './db/chapter.service';
import { QuestionService }  from './db/question.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CourseService,
        ChapterService,
        QuestionService
      ]
    };
  }
}
