import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../app-config/app-config';
import { IAppConfig } from '../app-config/iapp-config';

@Injectable()
export class AuthService {
  private url = this.config.apiEndpoint + 'api-token-auth/'

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: Http,
    private notificationsService: NotificationsService,
    private router: Router,
  ) {}

  login(credentials) {
    this.http.post(this.url, credentials)
      .map(res => res.json())
      .subscribe(
        data => {
          localStorage.setItem('username', credentials.username),
          localStorage.setItem('token', data.token),
          this.router.navigate(['/manage-tests/']);
        },
        error => this.notificationsService.error('Error', 'Incorrect username or password')
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  // Check every 30 seconds if the token is expired
  validate(): Observable<any> {
    return Observable.interval(30000).map(() => !tokenNotExpired() );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
