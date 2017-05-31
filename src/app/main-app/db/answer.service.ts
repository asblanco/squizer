import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { Answer } from './answer';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnswerService {
  private url = this.config.apiEndpoint + 'answer/';

  constructor(
    private authHttp: AuthHttp,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  create(answer: Answer): Promise<Answer> {
    return this.authHttp
      .post(this.url, JSON.stringify(answer))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
