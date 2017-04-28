import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from './course.service';
import { ChapterService } from './chapter.service';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';

import { SchoolYearService } from './school-year.service';
import { CallService } from './call.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DbModule,
      providers: [
        CourseService,
        ChapterService,
        QuestionService,
        AnswerService,
        SchoolYearService,
        CallService
      ]
    };
  }
}
