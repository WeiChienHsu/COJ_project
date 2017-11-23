import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
@Injectable()
export class DataService {
  problems: Problem[] = PROBLEMS;
  constructor() { }

  // get problems
  getProblems():Problem[]{
    return this.problems;
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
}
