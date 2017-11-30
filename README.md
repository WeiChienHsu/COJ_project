# COJ_project
# Week1
***
## Document Introduction

### e2e / karma.conf.js / protractor.cong.js 
```
For testing
```

### node_modules
```
Made by npm, then, npm will install libraries by package.json file
```

### gitignore 
```
Marked documents don't need to be uploaed eg. dependencies/node_module
```

### .angular-cli.json
* apps -> root -> src : the startpoint of our app
* outDir -> "dist" : files need to be uploaded (we'll change in the future)
* style -> style.css : global stylesheets (eg. bootstrap)

## src
### Template(VIEW)
```
Composing HTML templates with Angularized markup 
```
### Component(Model)
```
Classes to manage or support the templates.
Interacting with the VIEW through an API of properites and methods. 
```
- selector : How to show the page in index.html <app-root>

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

### Service
```
Adding application logic. Almost anything can be a service. (Logic Service / Data Service etc.)
```

### Module
- declarations : Component
- imports : Module
- providers : Service
- bootstrap : Enter
```
Boxing components and services. (收納箱)
```
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
***

# Components need to be Created
## Client (Data will connect with a fake)

```
╔  Router: app.routes.ts 
║      ↓
║      ↓       ╔ Problem-list
╟ Conponents ══╟ Problem-detail
║              ╟ New Problem
║              ╚ Navbar
║                   ↓ (without Navbar)
╚  Data Service ←  ↙          
```
- Made a dir. components in src/app/
- Used ag-cli automatically create four files 
- and add ProblemListComponent in app.module.ts 

```md
$mkdir components
$ng g c problem-list
```
***
## Add Bootstrap
- install bootstrap & jQuery package from npm 
- Since we don't use all bootstrap module, suggest to use from npm
```
npm install bootstrap --save
npm install jquery --save
```
- Add both jQuery nd Bootstrap in the script and stylesheet from ".angular-cli.json"
```js
      "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js"
      ],
```


***
## Problem List Component

### In problem-list.component.ts
```
Use tag <app-problem-list> made by Angular in "app.component.html.ts" 
could show the content from "problem-list.component.html"  
```
```
index.html(<app-root>) <- 
app.component.html.ts(<app-problem-list>) <-
problem-list.component.html.ts
```

```ts
 selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
```
### Add modeles for gaining Problems
- Opne a model file under the app
```
$ mkdir models
$ touch models/problem.model.ts
```
- Export a problem model
```ts
export class Problem{
    id: number;
    name: string;
    desc: string;
    diff: string;
}
```
### Create a mock data 
- In problem-list component, we need to import the model and create a variable with mock datas

```ts
const PROBLEMS: Problem[] = [
  {
    id: 1,
    name: "Two Sum",
    desc: `Given an array of integers...`,
    diff: "easy"
  },
  /// ...
];
```
### Model

- In model, we will provide problems to VIEW which only can access content inside ProblemListComponent.

- ngOnInit() : initization

- getProblems(): give model PROBLEMS outside to the problems inside Component

- :void : give the "type" of callback value to the method.

```ts
export class ProblemListComponent implements OnInit {
  problems = []; // give a list
  
  constructor() { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems(): void{
    this.problems = PROBLEMS;
  }

}
```
## View
### (problem-list.component.html)
- Build up a Structure with bootstrap
```ts

```
- "*ngFor": looping data from database and print it out
- Let each value in problems array save in a variable problem
```ts
*ngFor="let problem of problems"
```
- Gain the data from problems model and show on HTML markup (data binding)
```ts
{{problem.diff}}
```
- Also need a binding for class in span element, since we need to add-in a styling tag based on difficulty.
```ts
<span class="{{'pull-left label difficulty diff-' + problem.diff.toLowerCase()}}">
```

## Add in CSS Stylesheet
- problem-list.component.css
```css
.difficulty {
  min-width: 65px;
  margin-right: 10px;
}
....
```
***
# Seperate the Data and Model/View
- Create a single reusable data service and inject it into the components that need it.

## Move mock data to seperate file
- to mock-problems.ts and export it
```ts
import { Problem } from "./models/problem.model";
export const PROBLEMS: Problem[] = [
 //....
]
```
## Seperate the getting problem logic
```
$cd src/app
$mkdir services
$cd services
$ng g s data
```

### Provide the servie in app.module
```ts
@NgModule({
  providers: [
    DataService
  ],
})
```

### Add service in DataService
- Import problem model and mock problems
```ts
import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
```
- Add Method to help get singal problem with id and whole problems
```ts
  getProblems():Problem[]{
    return PROBLEMS;
  }

  getProblem(id: number): Problem{
    return PROBLEMS.find((problem) => problem.id === id );
  }
```

## Inject the service into problem-list component
```ts
import {DataService} from '../../services/data.service';

    problems: Problem[];
    constructor(private dataService: DataService) { }

    getProblems(): void{
    this.problems = this.dataService.getProblems();
```

*** 
## Problem Detail Component
```
ng g c problem-detail
```
*** 
### Single page app Routing
- Client side routing is the same as server side routing, 
- but it's ran in the browser
### Add app.routes.ts
```
touch app/app.routes.ts
```
- Import angular/router && Components

```ts
import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
```
### Settle a router and export for Root
```ts
const router: Routes =[
    {
        path: "",
        redirectTo: 'problems',
        pathMatch: 'full'
    },
    {
        path: 'problems',
        component: ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**',
        redirectTo: 'problems'
    }

];

export const routing = RouterModule.forRoot(router);
```

### Import in app.module
```
  imports: [
    BrowserModule,
    routing
  ],
```

### Change app.c.html for showing router page
```ts
<router-outlet></router-outlet>
```


### add a router link in an anchor tag (problem-list.component.html)
```ts
 <a class="list-group-item" *ngFor="let problem of problems"
      [routerLink]=['/problems',problem.id]>
```
***
### Add Pipe for SUMMARY
- Add summary.pipe.ts
```
$ng -g -p summary
```
- Import Pipe, PipeTransform and Give a logic to SUMMARY
```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: "summary"
})

export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?: number){
        if (!value)
            return null;
        return value.substr(0,70) + '...';
    }
}
```

- Add SummaryPipe into Module
```ts
@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    SummaryPipe
  ],
```

- Used Summary in html markup
```html
<div class="list-group-item description "> {{problem.desc | summary}}</div>
```

*** 
## Problem Detail Component
- Import Probelm from model
```ts
import { Problem } from '../../models/problem.model';

export class ProblemDetailComponent implements OnInit {
  problem : Problem[];
}
```
- Import Data from DataService and Gain data from ActivedRoute
```ts
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params} from '@angular/router';

  constructor(private dataService: DataService, private route: ActivatedRoute)  { }

```

- Used ngOnInit to get the id from Route and change the parameter from String into Number

```ts
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problem = this.dataService.getProblem(+params['id']); // Change String into Number
    })
  }
```

- Add HTML markup (*ngIf to show existed problem)
```html
<div class="container" *ngIf = "problem">
```

## NEW-Problem Component
- Add new-problem component
```
$ ng g c new-problem
```

- Import Form module
```ts
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
```

- HTML markup for New Problem Form 
- [()]: "Banana in the Box" for TWO-WAY data binding
* []: Property Binding (One-Way)
* (): Event Binding (One-Way)

- Input Name <label> + <input>
```html
<div>
  <form #formRef = "ngForm">
    <div class="form-group">
      <label for="problemName">Problem Name</label>
      <input name="problemName" id="problemName" 
      class="form-control" type="text" required 
      placeholder="Please Enter Problem Name" 
      [(ngModel)]="newProblem.name">
    </div>
    <div></div>
    .
    .
    .
  </form>
</div>
```

- Select Difficulities <\select> + <\option>
```html
<div class="form-group">
        <label for="problemDiff">Difficulty</label>
        <select name="diff" id="diff" class="form-control"  
        [(ngModel)]="newProblem.diff">
          <option *ngFor = "let diff of diffs" [value] = "diff">
            {{diff}}
          </option>
        </select>
      </div>
```

- Type Area <\textarea><\textarea>
```html
      <div class="form-group">
          <label for="problemDesc">Problem Description</label>
          <textarea name="problemDesc" id="problemDesc" 
          class="form-control" required 
          placeholder="Please Enter Problem Description" 
          [(ngModel)]="newProblem.desc" rows="3">
          </textarea>
      </div>
```

- Submit Button (with Click EVENT)
```html
<div class="row">
    <div class="col-md-12">
     <button type="submit" class="btn btn-info pull-roght"
    (click) = "addProblem()">
        Add Problem
    </button>
    </div>
</div>
```

### Modle and Data in New-Problem

- Import Problem Model into new-problem.component and Add a string array of difficulities

```ts
import { Problem } from '../../models/problem.model';

```
- Give a const variable of default Problem
```ts
const DEFAULT_PROBLEM: Problem = Object.freeze({
  id:0,
  name:'',
  desc:'',
  diff:'easy'
});
```



- Assign Value to Prpblem and then send the data to DataService for processing (by addProblenm())
- Import DataService
- Connent to Service in constructor
- Chagne new Problem into Default Problem after each added

```ts
newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  diffs: string[] = ['easy', 'medium', 'hard', 'super'];
  constructor(private dataService: DataService) { }
```
```ts
  addProblem(){
    this.dataService.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
```

- dataService modify: Since we couldn't change the array of PROBLEMS, we saved it to another variable for adding new Problems

```ts
problems: Problem[] = PROBLEMS;
```
- Also, change the original PROBLEM to this.problems which we setted last step
```ts
  getProblems():Problem[]{
    return this.problems;
  }
```

- Add a method of "addProblem()"
- Give a new problem an id and push this object into problems array
```ts
  addProblem(problem: Problem): void{
    problem.id = this.problems.length + 1;
    this.problems.push(problem);
  }
```

## Navbar Component
- create files for navbar
```
ng g c navbar
```
- Put navbar in app.component.html
```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```
- Copy navbar codes from bootstrap
```html
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container"> 
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
......
```

## Add footer
- install font-awsome
```
npm install --save font-awesome
```
- Add font-awesome stylesheet in ".angular-cli.json" 
```ts
"../node_modules/font-awesome/css/font-awesome.css"
```

- Add html
```html
<div class="container">
  <div class="social-icons">
   <ul class="list-inline">
     <li><a href="mailto:weichien711@gmail.com?Subject=Visiter from your website" target="_blank"  ><i class="fa fa-envelope"></i></a></li>
     <li><a href="https://github.com/WeiChienHsu" target="_blank"><i class="fa fa-github" ></i></a></li>
     <li><a href="https://www.linkedin.com/in/weichien-hsu/" target="_blank"><i class="fa fa-linkedin"></i></a></li>
   </ul>
 </div> <!-- /.social-icons -->
</div>  
```
***
***





# Week 2
## Copy Week1 to Week2 (for homework)
```
cp -R week1 week2
```

## Initialize oj-server

```
mkdir oj-server
```
- Add scripts > "start": "node server.js"

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },

```
- initize npm
```
npm init
```
- Add .gitignore
```
touch .gitignore
```
```
# dependencies
/node_modules
```
- install express
```
npm install express --save
```
## Create a RESTful API Server (Feature)
- User can GET and POST problems from server using RESTful API

### STEP 1
* Handle server-side routing
* Create server.js
* Start project with nodemon

### STEP 2
* GET /api/v1/problems (get all problems)
* GET /api/v1/problems/:id (get problem by id)
* POST /api/v1/problems (add a new problem)

### STEP 3
* Add Router to server.js

### STEP 4
* Create problemService to READ/WRITE the problem data (Mock data)

### STEP 5
* Test with POSTMAN

### STEP 6
* Handle GET /api/v1/problems/:id
* Handle POST /api/vi/problems requests
* npm install body-parser --save

## STEP 7
* Test with POSTMAN

## Set up EXPRESS
- open server.js file and C&P init document
```js
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```

## Design API
- give a ROUTER to deal with specific stuff then we can clearify what the requests are asked for easier

```js
app.use('/api/v1', restRouter);
```

- Open a folder "routes" to deal with all routing problem
- add new file "rest.js" (writting in express)

```
mkdir routes
touch routes/rest.js
```

## rest.js

```js
const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');
```

- Don't need to write /api/vi since we have alrady set up by useing "app.use" in server.js
- Add a promise
- For example, get a request of "getProblem()" and send a problems out

```js
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

```

- Export router
```js
module.exports = router;
```

- in server.js, import restRouter
```js
const restRouter = require('./routes/rest.js');
```

## Build up a problemService
### getPorblems()
- To deal with data, we need a problemService to connect with our router
```
mkdir services
touch services/problemService.js
```
- Add a mock data since we haven't touch database
```js
problems = [
  ....
]
```

- Give a function to get Problems and export it.
```js
const getProblems = function(){
    console.log('In the problem service get problems')
    return new Promise((resolve, reject) => {
        resolve(problems);
    })
}

const getProblem = function(){}

module.exports = {
    getProblems,
    getProblem
}
```

### getPorblem()
#### rest.js
- In rest.js, given a request parameter(id) to getProblem() in problemService to catch the problem we needed
- give a + to change id from string into number

```js
router.get('/problems/:id', (req, res) =>{
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem))
} )
```
#### problemService.js
- In problemService.js
```js
const getProblem = function(id){
    console.log("In the problem service get single problem");
    return new Promise((resolve, reject) => {
        resolve(problems.find(problem => problem.id === id));
    });
}
```

### PostPorblems()
- Body Parser (jsonparser) help to take JSON object from body for sending POST request.
- In rest.js
```
npm install body-parser --save
```
```js
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
```
- Post Problem
- Need a jsonParser as a middleware to transfer "req.body" into JSON object

```js
router.post('/problems',jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(problem => { //resolve
            res.json(problem);
        },(error) => { //reject
            res.status(400).send('Problem name already exists!');
        })
})

```
- Add addProblem function in problemService
```js
const addProblem = function(newProblem){
    return new Promise((resolve, reject) => {
        if (problems.find(problem => problem.name === newProblem.name)){
            reject('Problem already exists!');
        } else {
            newProblem.id = problems.length + 1;
            problems.push(newProblem);
            resolve(newProblem);
        }
    });
}
```


## Testing by POSTMAN
- GET problem by typing in address and it'll send out out mock data in JSON
- Reject : frontend will have a handler such as the same JS promise
```
"http://localhost:3000/api/v1/problems"
```

- POST problem will be send as a JOSN file in body and then we need to use body-parser to read the content in backend
- Send a JOSN object POST request by Postman
* Same name sent, should respone "Problem name already exists!"
```js
{
	    "name": "3Sum",
        "desc": "Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
        "difficulty": "medium"
}
``` 

* Post a right request will respone right messages with new id
```js
{
    "name": "31Sum",
    "desc": "Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
    "difficulty": "medium",
    "id": 6
}
```
***

## Integrate MongoDB
### Step 1
- Register an account on mLab and create a database

### Step 2
- Install mongoose and connect to MongoDB on mLab
```
npm install mongoose --save
```

### Step 3
- Add schema problemModel

### Step 4
- refactor problemService to READ/WRITE data FROM/TO MongoDB

## Mongoose Connecting
- Reqire and connect mongoose
- server.js
```ts
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds123976.mlab.com:23976/cs503-1705test');
```

## Build up a Schema for frontend to read
```
mkdir models
touch models/problemModel.js
```

- problemModel.js
```js
const mongoose = require('mongoose');
const ProblemSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    diff: String
});

const ProblemModel = mongoose.model('ProblemModel', ProblemSchema);
module.exports = ProblemModel;
```

## Use data from MongoDB
- In problemService, we need to get problem from database

- No longer need the old getProblem function since it gets problem from our mock data.

- Directly get problems from database

- ProblemModel.find(condition, callback[err, data]) : no condition and callback first deal with error and reject or resolve(send back) the data

### getProblems
- findOne({id: neameYouInput}, (err, problem))
```js
const getProblem = function(id){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, (err, problem) => {
            if (err) {
                console.log("In the problem service get problem");
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}
```

### getProblem
```js
const getProblem = function(id){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, (err, problem) => {
            if (err) {
                console.log("In the problem service get problem");
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}
```

### addProblem
- If found a same id which means the data exist, we need to reject
- Count the problems and assign a new id
- Create a mongoProblem for sending data to MongoDB (use mongoProblem.save())

```js
const addProblem = function(newProblem){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, (err, data) => {
            if (data) { 
                // find a same id
                reject('Problem already exists!');
            } else {
                ProblemModel.count({}, (err, count) => {
                    newProblem.id = count + 1;
                    //Save into MongoDB
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                });
            }
        });
    });
}
```
***

## Connect 

### STEP 1  
- Refactor client-side data.service to async 
- in app.module.ts
- import HttpClientModule

### STEP 2
- Refactor all components calling data.service
- Problem-list.component.ts
- Problem-detail.component.ts
- New-Problem.component.ts

### STEP 3 
- Update .angualr-cli.json, change location of ourDir
- In the future, you can use ng build -- watch in/ oj-client, we are not using localhost:4200 anymore
- 
### STEP 4
- Send static web pages from server to browser

### STEP 5
- Solve "refresh" issue

## Refactor client-side data.service

- Call out DataService which used to connect with mock data
- Http Module (in app.module)

```ts
import { HttpClientModule } from '@angular/common/http';

  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
```
- Import HttpClient, HttpHeaders, HttpResponse:

- Observable: Observe Data Flow. Non-stop sending data, with Values, Complete, Arror. 

- BehaviorSubject: Always exist.

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
```

- No longer need the mock problem and change it to the problemSource putting all problems inside and marks it as private

```ts
 // problems: Problem[] = PROBLEMS;

  private _problemSource = new BehaviorSubject<Problem[]>([]);

```

- Register Angular HttpClient
```ts
 constructor(private HttpClient: HttpClient) { }
```

- Call Api v1, Endpoint ('api/v1/problem');
```ts
  getProblems():Observable<Problem[]>{
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
      return this._problemSource.asObservable();
  }
```

- Create a function to handle Error
```ts
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }
```