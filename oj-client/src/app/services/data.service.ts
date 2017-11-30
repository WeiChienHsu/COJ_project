import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { Problem } from '../models/problem.model';

// import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;

  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  // get problems
  getProblems():Observable<Problem[]>{
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
      return this._problemSource.asObservable();
  }

  // get single problem
  getProblem(id: number): Problem{
    return this.problems.find((problem) => problem.id === id );
  }
    
  // add New Problem  
  addProblem(problem: Problem): void{
    problem.id = this.problems.length + 1;
    this.problems.push(problem);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }
}
