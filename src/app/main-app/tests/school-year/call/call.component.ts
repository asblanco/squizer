import { Component, Input, OnDestroy } from '@angular/core';
import { Call } from '../../../db/call';
import { CallService } from '../../../db/call.service';
import { NotificationsService } from 'angular2-notifications';
import { TestsSideNavService } from './../../tests-side-nav/tests-side-nav.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnDestroy {
  @Input() call: Call;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private callService: CallService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService: NotificationsService
  ) {
    this.testsSideNavService.editedCall$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      call => {
        this.call = call;
    });
  }

  openEditCallModal() {
    (<any>$('#editCallModal' + this.call.id)).openModal();
  }

  openDeleteCallModal() {
    (<any>$('#deleteCallModal' + this.call.id)).openModal();
  }

  deleteCall() {
    this.callService
    .delete(this.call.id)
    .then(() => {  
      this.testsSideNavService.announceDeleteCall(this.call);
    })
    .catch(() => this.notificationsService.error('Error', 'Al eliminar convocatoria ' + this.call.title));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
