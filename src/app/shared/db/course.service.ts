import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Course } from './course';

@Injectable()
export class CourseService {
  private url = 'http://127.0.0.1:8000/course/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCourses(): Promise<Course[]> {
    const urlListCourses = `http://127.0.0.1:8000/courses/`;
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
