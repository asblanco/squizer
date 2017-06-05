import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Term } from './term';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { AuthService } from '../../shared/auth/auth.service';

@Injectable()
export class TermService {
  private url = this.config.apiEndpoint + 'term/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getTerm(id: number): Promise<Term> {
    this.authService.refreshToken();
    const url = `${this.url}${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as Term)
      .catch(this.handleError);
  }

  create(term: Term): Promise<Term> {
    this.authService.refreshToken();
    return this.authHttp
      .post(this.url, JSON.stringify(term), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(term: Term): Promise<Term> {
    this.authService.refreshToken();
    const url = `${this.url}${term.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(term), {headers: this.headers})
      .toPromise()
      .then(() => term)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    this.authService.refreshToken();
    const url = `${this.url}${id}/`;
    return this.authHttp.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
