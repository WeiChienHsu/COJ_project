import { DataService } from './../../services/data.service';
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
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  diffs: string[] = ['easy', 'medium', 'hard', 'super'];
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addProblem(){
    this.dataService.addProblem(this.newProblem);
    // we need to chagne new Problem into Default Problem after each added
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
