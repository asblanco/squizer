import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { ApiConfig }          from '../web-api/api-config';
import { IApiConfig }         from '../web-api/api-config.interface';
import { Course }             from './course';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
  private url = this.config.apiEndpoint + 'course/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(ApiConfig) private config: IApiConfig
  ) { }

  getCourses(): Promise<Course[]> {
    const urlListCourses = this.config.apiEndpoint + 'courses/';
    return this.http.get(urlListCourses)
               .toPromise()
               .then(response => response.json() as Course[])
               .catch(this.handleError);
  }

  getCourseDetails(id: number): Promise<Course> {
    const url = `${this.url}${id}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Course)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(name: string): Promise<Course> {
    return this.http
      .post(this.url, JSON.stringify({name: name, chapters:[]}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(course: Course): Promise<Course> {
    const url = `${this.url}${course.id}/`;
    return this.http
      .put(url, JSON.stringify(course), {headers: this.headers})
      .toPromise()
      .then(() => course)
      .catch(this.handleError);
  }

}
