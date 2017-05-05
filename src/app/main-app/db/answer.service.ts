import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { APP_CONFIG } from '../shared/app-config/app-config';
import { IAppConfig } from '../shared/app-config/iapp-config';
import { Answer } from './answer';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnswerService {
  private url = this.config.apiEndpoint + 'answer/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  create(answer: Answer): Promise<Answer> {
    return this.http
      .post(this.url, JSON.stringify(answer), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
