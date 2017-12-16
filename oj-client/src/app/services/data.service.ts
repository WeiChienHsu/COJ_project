import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { Problem } from '../models/problem.model';
import { resetFakeAsyncZone } from '@angular/core/testing';

// import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;

  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  // get problems
  getProblems(): Observable<Problem[]>{
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
      return this._problemSource.asObservable();
  }

  // get single problem
  getProblem(id: number): Promise<Problem>{
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }
    
  // add New Problem  
  addProblem(problem: Problem) {
      const options = { headers: new HttpHeaders({'Content-Type': 'application/json' })};
      return this.httpClient.post('api/v1/problems', problem, options)
        .toPromise()
        .then((res: any) => {
          this.getProblems();
          return res;
        })
        .catch(this.handleError);
    }

  buildAndRun(data): Promise<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.httpClient.post('api/v1/results', data, options)
      .toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }
}
