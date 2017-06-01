import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Call } from '../../../db/call';
import { CallService } from '../../../db/call.service';
import { CourseService } from '../../../db/course.service';
import { Course } from '../../../db/course';
import { TestsSideNavService } from '../../tests-sidenav/tests-sidenav.service';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  callId: number;
  call: Call;
  courses: Course[];
  deleteCallModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private callService: CallService,
    private courseService: CourseService,
    private notificationsService: NotificationsService,
    private router: Router,
    private testsSideNavService: TestsSideNavService
  ) {
    this.courseService.getCourses()
    .then(courses => { this.courses = courses; })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de asignaturas.'));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.callId = params['callId'];
       this.getCall(this.callId);
     });
  }

  openDeleteCallModal() {
    this.deleteCallModal.emit({action:"modal",params:['open']});
  }

  getCall(id: number) {
    this.callService.getCall(id)
    .then(call => {
      this.call = call;
      this.testsSideNavService.announceSelected(call.school_year, call.id);
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar los datos de la convocatoria.'));
  }

  deleteCall() {
    this.callService
    .delete(this.call.id)
    .then(() => {
      this.testsSideNavService.deleteCall(this.call);
      this.router.navigate(['/manage-tests/school-year/' + this.call.school_year]);
    })
    .catch(() => this.notificationsService.error('Error', 'Al eliminar convocatoria ' + this.call.title));
  }

}
