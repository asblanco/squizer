import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {
  private url = 'http://127.0.0.1:8000/questions/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(title: string, chapter: number): Promise<Question> {
    return this.http
      .post(this.url, JSON.stringify({chapter: chapter, title: title, answers:[]}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(question: Question): Promise<Question> {
    const url = `${this.url}${question.id}/`;
    return this.http
      .put(url, JSON.stringify(question), {headers: this.headers})
      .toPromise()
      .then(() => question)
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
