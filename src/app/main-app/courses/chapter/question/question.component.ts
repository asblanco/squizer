import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../../db/question';
import { QuestionService } from '../../../db/question.service';
import { CourseInfoService } from '../../course-info.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() i: number;

  constructor(
    private courseInfoService: CourseInfoService,
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) { }

  ngOnInit() { }

  openEditQuestionModal() {
    (<any>$('#editQuestionModal' + this.question.id)).openModal({dismissible: false});
  }

  openDeleteQuestionModal() {
    (<any>$('#deleteQuestionModal' + this.question.id)).openModal();
  }

  deleteQuestion() {
    this.questionService
        .delete(this.question.id)
        .then(() => {
          this.courseInfoService.deleteQuestion(this.question.chapter, this.question);
        })
        .catch( () => this.notificationsService.error('Error', 'Al eliminar la pregunta: ' + this.question.title));
  }
}
