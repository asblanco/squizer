import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { I18nService } from '../i18n/i18n.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../app-config/app-config';
import { IAppConfig } from '../app-config/iapp-config';

@Injectable()
export class AuthService {
  private url = this.config.apiEndpoint + 'api-token-auth/';
  private urlRefresh = this.config.apiEndpoint + 'api-token-refresh/';

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: Http,
    private i18nService: I18nService,
    private router: Router,
  ) {}

  login(credentials) {
    this.http.post(this.url, credentials)
      .map(res => res.json())
      .subscribe(
        data => {
          localStorage.setItem('username', credentials.username);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/manage-tests/']);
        },
        error => this.i18nService.error(0, '')
      );
  }

  refreshToken() {
    const token = localStorage.getItem('token');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.urlRefresh, { headers: headers, 'token': token })
      .map(res => res.json())
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
        },
        error => this.i18nService.error(26, '')
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  // Check every 30 seconds if the token is expired
  validate(): Observable<any> {
    return Observable.interval(10000).map(() => !tokenNotExpired() );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
