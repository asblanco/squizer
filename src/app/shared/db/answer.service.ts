import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { ApiConfig }          from '../web-api/api-config';
import { IApiConfig }         from '../web-api/api-config.interface';
import { Answer }             from './answer';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnswerService {
  private url = this.config.apiEndpoint + 'answers/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(ApiConfig) private config: IApiConfig
  ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(answer: Answer): Promise<Answer> {
    return this.http
      .post(this.url, JSON.stringify(answer), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}
