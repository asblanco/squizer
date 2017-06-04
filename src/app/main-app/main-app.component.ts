import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { i18nService } from '../shared/i18n/i18n.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main-app.component.html',
})
export class MainAppComponent implements OnInit, OnDestroy {
  private subscription;

  constructor(
    private auth: AuthService,
    private i18nService: i18nService,
  ) {}

  ngOnInit() {
    this.subscription = this.auth.validate()
    .subscribe((tokenExpired) => {
      if(tokenExpired) {
        this.i18nService.alert(0),
        this.auth.logout();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
