import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { Question } from './question';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  private url = this.config.apiEndpoint + 'question/';

  constructor(
    private authHttp: AuthHttp,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  create(question: Question): Promise<Question> {
    return this.authHttp
      .post(this.url, JSON.stringify(question))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(question: Question): Promise<Question> {
    return this.authHttp
      .put( this.config.apiEndpoint + `update-question/${question.id}/`,
            JSON.stringify(question) )
      .toPromise()
      .then(() => question)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
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
