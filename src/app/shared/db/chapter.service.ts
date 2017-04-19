import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { ApiConfig }          from '../web-api/api-config';
import { IApiConfig }         from '../web-api/api-config.interface';
import { Chapter }            from './chapter';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChapterService {
  private url = this.config.apiEndpoint + 'chapters/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(ApiConfig) private config: IApiConfig
  ) { }

  getChapters(): Promise<Chapter[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as Chapter[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(title: string, course: number): Promise<Chapter> {
    return this.http
      .post(this.url, JSON.stringify({course: course, title: title, questions:[]}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(chapter: Chapter): Promise<Chapter> {
    const url = `${this.url}${chapter.id}/`;
    return this.http
      .put(url, JSON.stringify(chapter), {headers: this.headers})
      .toPromise()
      .then(() => chapter)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
