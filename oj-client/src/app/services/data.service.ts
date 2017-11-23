import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
@Injectable()
export class DataService {

  constructor() { }

  // get problems
  getProblems():Problem[]{
    return PROBLEMS;
  }

  // get single problem
  getProblem(id: number): Problem{
    return PROBLEMS.find((problem) => problem.id === id );
  }
    
  // add New Problem  
}
