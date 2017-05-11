import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Question } from '../../../../db/question';
import { QuestionService } from '../../../../db/question.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: Question;
  @Input() i: number;
  @Output() deletedQuestion: EventEmitter<Question> = new EventEmitter();

  constructor(
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) { }

  openEditQuestionModal() {
    (<any>$('#editQuestionModal' + this.question.id)).openModal({dismissible: false});
  }

  openDeleteQuestionModal() {
    (<any>$('#deleteQuestionModal' + this.question.id)).openModal();
  }

  deleteQuestion() {
    this.questionService.delete(this.question.id)
      .then(() => {
        this.deletedQuestion.emit(this.question);
      })
      .catch(() => this.notificationsService.error('Error', 'Al eliminar la pregunta: ' + this.question.title));
  }
}
