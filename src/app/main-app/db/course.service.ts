import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { Course } from './course';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
  private url = this.config.apiEndpoint + 'course/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private authHttp: AuthHttp,
  ) { }

  getCourses(): Promise<Course[]> {
    return this.authHttp.get(this.config.apiEndpoint + 'courses/')
      .toPromise()
      .then(response => response.json() as Course[])
      .catch(this.handleError);
  }

  getCourseDetails(id: number): Promise<Course> {
    const url = `${this.url}${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as Course)
      .catch(this.handleError);
  }

  create(name: string): Promise<Course> {
    return this.authHttp
      .post(this.url, JSON.stringify({name: name, chapters: []}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(course: Course): Promise<Course> {
    const url = `${this.url}${course.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(course), {headers: this.headers})
      .toPromise()
      .then(() => course)
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
