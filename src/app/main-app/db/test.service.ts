import { Injectable, Inject } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { APP_CONFIG } from '../shared/app-config/app-config';
import { IAppConfig } from '../shared/app-config/iapp-config';

import { Test } from './test';
import { ViewTest } from './view-test';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
 // import 'rxjs/Rx';

@Injectable()
export class TestService {
  private url = this.config.apiEndpoint + 'test/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getCourseCallTests(call: number, course: number): Promise<Test[]> {
    const url = `${this.url}?call=${call}&course=${course}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Test[])
               .catch(this.handleError);
  }

  getTest(id: number): Promise<ViewTest> {
    const url = this.config.apiEndpoint + `retrieve-test/${id}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ViewTest)
      .catch(this.handleError);
  }

  create(test: Test): Promise<Test> {
    return this.http
      .post(this.url, JSON.stringify(test), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(test: Test): Promise<Test> {
    const url = `${this.url}${test.id}/`;
    return this.http
      .put(url, JSON.stringify(test), {headers: this.headers})
      .toPromise()
      .then(() => test)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  downloadPDF(id: number): any {
    // const url = `https://latexonline.cc/compile?url=http://asblanco.com/test.tex`;
    const url = this.config.apiEndpoint + 'test-pdf/' + id;
    return this.http.get(url, { responseType: ResponseContentType.Blob })
    .map(
      (res) => {
        // return res;
        return new Blob([res.blob()], { type: 'application/pdf' })
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
