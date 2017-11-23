import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id:0,
  name:'',
  desc:'',
  diff:'easy'
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  newProblem: Problem;
  diffs: string[] = ['easy', 'medium', 'hard', 'super'];
  constructor() { }

  ngOnInit() {
  }

}
