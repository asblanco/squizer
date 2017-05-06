import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { APP_CONFIG } from '../shared/app-config/app-config';
import { IAppConfig } from '../shared/app-config/iapp-config';

import { SchoolYear } from './school-year';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SchoolYearService {
  private url = this.config.apiEndpoint + 'school-year/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getSchoolYears(): Promise<SchoolYear[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as SchoolYear[])
               .catch(this.handleError);
  }

  getSchoolYear(id: number): Promise<SchoolYear> {
    const url = `${this.url}${id}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as SchoolYear)
      .catch(this.handleError);
  }

  create(schoolYear: SchoolYear): Promise<SchoolYear> {
    return this.http
      .post(this.url, JSON.stringify(schoolYear), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(schoolYear: SchoolYear): Promise<SchoolYear> {
    const url = `${this.url}${schoolYear.id}/`;
    return this.http
      .put(url, JSON.stringify(schoolYear), {headers: this.headers})
      .toPromise()
      .then(() => schoolYear)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}/`;
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
