import { Injectable, Inject } from '@angular/core';
import { Headers, ResponseContentType } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { AuthService } from '../../shared/auth/auth.service';

import { Test } from './test';
import { TestDetail } from './test-detail';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {
  private url = this.config.apiEndpoint + 'test/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getCourseTermTests(term: number, course: number): Promise<Test[]> {
    this.authService.refreshToken();
    const url = `${this.url}?term=${term}&course=${course}`;
    return this.authHttp.get(url)
               .toPromise()
               .then(response => response.json() as Test[])
               .catch(this.handleError);
  }

  getTest(id: number): Promise<TestDetail> {
    this.authService.refreshToken();
    const url = this.config.apiEndpoint + `test-detail/${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as TestDetail)
      .catch(this.handleError);
  }

  create(test: Test): Promise<Test> {
    this.authService.refreshToken();
    return this.authHttp
      .post(this.url, JSON.stringify(test), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(test: Test): Promise<Test> {
    this.authService.refreshToken();
    const url = `${this.url}${test.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(test), {headers: this.headers})
      .toPromise()
      .then(() => test)
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

  downloadPDF(id: number): any {
    this.authService.refreshToken();
    const url = `${this.config.apiEndpoint}test-pdf/${id}/`;
    return this.authHttp.get(url, { responseType: ResponseContentType.Blob })
    .map(
      (res) => {
        return new Blob([res.blob()], { type: 'application/pdf' });
      });
  }

  downloadTEX(id: number): any {
    this.authService.refreshToken();
    const url = `${this.config.apiEndpoint}test-tex/${id}/`;
    return this.authHttp.get(url, { responseType: ResponseContentType.Blob })
    .map(
      (res) => {
        return new Blob([res.blob()], { type: 'plain/text' });
      });
  }

  generateTest(test): Promise<Test> {
    this.authService.refreshToken();
    const url = `${this.config.apiEndpoint}generate-test/`
    return this.authHttp
      .post(url, JSON.stringify(test))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
