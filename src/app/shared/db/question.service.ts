import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { ApiConfig }          from '../web-api/api-config';
import { IApiConfig }         from '../web-api/api-config.interface';
import { Question }           from './question';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  private url = this.config.apiEndpoint + 'questions/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(ApiConfig) private config: IApiConfig
  ) { }

  create(question: Question): Promise<Question> {
    return this.http
      .post(this.url, JSON.stringify(question), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(question: Question): Promise<Question> {
    return this.http
      .put( this.config.apiEndpoint + `update-question/${question.id}/`,
            JSON.stringify(question),
            {headers: this.headers}
          )
      .toPromise()
      .then(() => question)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
