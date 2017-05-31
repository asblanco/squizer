import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { SchoolYear } from './school-year';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SchoolYearService {
  private url = this.config.apiEndpoint + 'school-year/';

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    public authHttp: AuthHttp
  ) { }

  getSchoolYears(): Promise<SchoolYear[]> {
    return this.authHttp.get(this.url)
               .toPromise()
               .then(response => response.json() as SchoolYear[])
               .catch(this.handleError);
  }

  getSchoolYear(id: number): Promise<SchoolYear> {
    const url = `${this.url}${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as SchoolYear)
      .catch(this.handleError);
  }

  create(schoolYear: SchoolYear): Promise<SchoolYear> {
    return this.authHttp
      .post(this.url, JSON.stringify(schoolYear))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(schoolYear: SchoolYear): Promise<SchoolYear> {
    const url = `${this.url}${schoolYear.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(schoolYear))
      .toPromise()
      .then(() => schoolYear)
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
