import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-main',
  templateUrl: 'main-app.component.html',
})
export class MainAppComponent implements OnInit, OnDestroy {
  private subscription;

  constructor(
    private auth: AuthService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit() {
    this.subscription = this.auth.validate()
    .subscribe((tokenExpired) => {
      if(tokenExpired) {
        this.notificationsService.alert('Alert', 'Your session has expired')
        this.auth.logout();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
