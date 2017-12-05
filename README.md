# COJ_project

## How build the both client and server sides for this App
```
╔══════════════════════╗        ╔═══════════╗ 
║ App.component.html.ts║-------➡║ index.html║-------
╚══════════════════════╝        ╚═══════════╝       |
    ↗         ↖                                     |
╔════════╗   ╔════════╗                             |
║ Navbar ║   ║ Router ║                             |
╚════════╝   ╚════════╝                             |
                  ↗    ↖                            |
╔══════════════════════╗ ╔═══════════════════════╗  |
║ ProblemListCompinent ║ ║ ProblemDetailComponent║  |
╚══════════════════════╝ ╚═══════════════════════╝  |
        ↗                ↘      ↓ onInit function   |
╔══════════════════════╗   ╔════════════╗           |
║  NewProblemCompinent ║ ➡ ║ DataService║           |
╚══════════════════════╝   ╚════════════╝           |
              (api Request)  ↑  ↓           ╔═══════════╗
-----------------------------↑  ↓ --------  ║public/    ║
                             ↑    ↘         ║ index.html║
                             ↑       ↘      ╚═══════════╝
╔══════════════╗     ╔═══════════╗    ↘    ↗  Index   
║ProblemService║ ↔↔↔ ║Rest Router║    ↓    ↑    Router
╚══════════════╝     ║  rest.js  ║   ╔═══════════╗
    ↓↑               ╚═══════════╝ ↖ ║ Server.js ║
    ↓↑                               ╚═══════════╝
    ↓↑                                     ║
╔══════════════╗      ╔══════════╗ connect ║ 
║ ProblemModel ║  ←←← ║ MongoDB  ║ ════════╝ 
╚══════════════╝      ╚══════════╝
```
***
## How a request was sent from frontend to backend and back to browser

- DataService(FrontEnd) call a Http Request 
- for example getProblems()
- api Request send to server.js 
- Server.js send request to RestRouter to find a right ProblemService
- Problem help to get data from ProblemSchema 
- ProblemModel search the data from Database and send back to RestRouter
- RestRouter get the problems data and chagne it to a JSON file
- Send it back to DataService
- Since problem-list have subscripted, the chagne will call to frontend angular cli
- By data binding with html, frontend contents change

***

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

- Observable: Observe Data Flow. Non-stop sending data, with Values, Complete, Error. 

- BehaviorSubject: Always exist.

* [For more information about observables](https://www.zhihu.com/question/48615787)

* [For more information about observables](https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable)


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
### getProblems

- Call Api v1, Endpoint ('api/v1/problem')
- Transfer BehaviorSubject into Promise
- "Next" : receive the changes and check the latest data from database
- "Catch" : for frontend to handle Error, if there's error, use handleError method

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

### getProblem

```ts
  getProblem(id: number): Promise<Problem>{
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }
```

### addProblem

- Since we need to send a POST request to API, we need to give a hearder first (Content-Type).

- Post Request will send url+body+header and a callback function

- Call getProblems: since frontend won't know the change of database when we add a problem so after we update problem list, we need to call back new problem list in frontend

```ts
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
```



## Change Problem-list.component from sync to async (同步 -> 異步) and add Subscription

- Import OnDestroy/Subscription
- subcribe when OiInit, then when the problem data change, our frontend will know

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
```

- subscription 
```ts
subscriptionProblems: Subscription;
```

- Oninit
- OnDestroy

```ts
  ngOnInit() {
    this.getProblems();
  }

  ngOnDestroy(){
    this.subscriptionProblems.unsubscribe();
  }
```

- change the getProblem from sync to async
```ts
  getProblems(): void{
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

```

## Problem-detail
- getProblem callback is a Promise, we need to change how onInit works.

```ts
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getProblem(+params['id'])
        .then(problem => this.problem = problem)
    });
```

## New Problem
- Dont need to change, we didn't use the data from database

## Run oj-client into Production
- Set all UI documents will into publuc
- In .angular-cli.json, change "outDir" to '../public'
- in Oj-client, and heres a public file

```
ng build
```

## Add a logic to connect oj-server and index.html

- In server.js, add another router to deal with pade localhost3000
```js
app.use('/', indexRouter);
```

- In index.js, use "Path" from nodeJS to get the content from public when someone send a request asking localhost3000
```js
const express = require('express');
const router = expree.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../public/')});
});

module.exports = router;
```

## Face an Error
- Fail to load the static files such as JS, CSS, HTML

```
localhost/:13 GET http://localhost:3000/inline.bundle.js net::ERR_ABORTED
localhost/:13 GET http://localhost:3000/polyfills.bundle.js net::ERR_ABORTED
localhost/:13 GET http://localhost:3000/scripts.bundle.js net::ERR_ABORTED
localhost/:13 GET http://localhost:3000/styles.bundle.js net::ERR_ABORTED
localhost/:13 GET http://localhost:3000/vendor.bundle.js net::ERR_ABORTED
localhost/:13 GET http://localhost:3000/main.bundle.js net::ERR_ABORTED
```
- Give a path
```js
const path = require('path');

app.use(express.static(path.join(__dirname, '../public/')));

```

## Frontend Client Routing
- Server couldn't deal with frontend router
- After finishing indexRouter and restRouter logic, backend will directly send back the index.html nomether what request fronend (client) send
```js
app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public/')})
})
```
***
***



# Week 3

- Create Editor Component
- Embedding Ace Editor (third party)
- Add language select, reset and submit buttons
- Install socket.io on oj-client and oj-server
- Establish socket connection
- Synchronize the editor buffer content
- Store and restore socket sessions with Redis

## Reference

- [ACE](https://ace.c9.io/#nav=api&api=editor)

- [Socket.io](https://socket.io/docs/) 

- [Socket.io client](https://socket.io/docs/client-api/)

- [Socket.io server](https://socket.io/docs/server-api/)

## Before Editting
-Copy the week2 code

```
cp -r week2 week3
```

- Create Editor Component
```
ng g c editor
```

## Add Editor
- In porblem details html
- Hidden in x samll screen
```
  <div class="hidden-xs col-md-8">
    <app-editor></app-editor>
  </div>
```

## ACE Editor
- Install package
```
npm install --save ace-builds
```
- Add JS packages in .angular-cli
- src-min-noconflict for not conflicting
```json
      "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js",
        "../node_modules/ace-builds/src-min-noconflict/ace.js",
        "../node_modules/ace-builds/src-min-noconflict/mode-java.js",
        "../node_modules/ace-builds/src-min-noconflict/mode-python.js"
      ],
```
## Editor Styling
- Declare ace in component.ts
```ts
declare const ace: any;
```
- Add Script in "ngOnInit()"
- set a editor value
- Add an editor variable inside class
```ts
  export class EditorComponent implements OnInit {
  editor: any;

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['Java'])
  }
```

- Add Default Content
```ts
defaultContent = {
   'Java': `public class Example {
     public static void main(String[] args) {
         // Type your Java code here
     }
   }`,
   'Python': `class Solution:
   def example():
       # Write your Python code here`
  };
```

- HTML
```html
<div id="editor"></div>
```
- CSS
- media: screen
```css
@media screen {
    #editor {
        height: 600px;
    }
}
```
- Styling
```css
#editor {
      height: 600px;
    }
    .lang-select {
      width: 100px;
      margin-right: 10px;
    }
    header .btn {
      margin: 0 5px;
    }
    footer .btn {
      margin: 0 5px;
    }
    .editor-footer, .editor-header {
      margin: 10px 0;
    }
    .cursor {
      /*position:absolute;*/
      background: rgba(0, 250, 0, 0.5);
      z-index: 40;
      width: 2px !important;
    }
```

## Add DropDown in Editor

- Choose language
- setLanguage()
```html
<section>
<header class="editor-header">
    <select class="form-control pull-left lang-select" name="language"
    [(ngModel)]="language" (change)="setLanguage(language)">
        <option *ngFor="let language of languages" [value]="language">
            {{language}}
        </option>
    </select>
```

- Reset Button
```html
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Reset
    </button>
```
- Modal Dalogue
- With reset editor()
```html
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            You will lose current code in the editor, are you sure?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal"
            (click)="resetEditor()">Reset</button>
        </div>
        </div>
    </div>
    </div>
</header>
```

- Editor inside Row
```html
<div class="row">
    <div id="editor"></div>
</div>
```

- Submit button
```html
<footer class="editor-footer">
    <button type="button" class="btn btn-success pull-right" 
    (click)="submit()">Submit Solution</button>
</footer>
</section>
```

## Add methods in editor component
- Setup languages and default language
```ts
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
```
- resetEditor
```ts
  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
  }
```

- setLanguage
```ts
  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }
```
- subimt
```ts
  submit(): void{
    const userCode = this.editor.getValue();
    console.log(userCode); // temp
  }
```

## Refactor editor logic
- call resetEditor when Oninit
- move the getSession function to reset function and change its theme based on language we chose
```ts
  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
  }

    resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLocaleLowerCase());
  }
  ```
***

# Synchronize the editor buffer content

## Client Socket
- Install socket.io
```
npm install --save socket.io
```

### Cleint side will have a collaboration service deals with server
- Add module in client side and add in app.module
```
ng g s collaboration
```

- App.module

```
  providers: [
    DataService,
    CollaborationService
  ],
```
- .angular-cli
```json
"../node_modules/socket.io-client/dist/socket.io.js"
```

- collaboration.service
- Every times when you connect, socket send a message to window.location.origin (Backend server Endpoint)
```ts
init(): void {
    this.collaborationSocket = io(window.location.origin, {query: "message=" + "haha"});
```

- Add Event handler to receive message
```ts
    this.collaborationSocket.on('message', (message) => {
      console.log('message received from server' + message);
    });
```

- Import Collaboration Service in editor component, when editor init, it will call an collaboration.init() function
```ts
constructor( private collaboration: CollaborationService) { }

ngOnInit(){
  this.collaboration.init();
}
```

## Server Socker
- Install socket.io
```
npm install --save socket.io
```
- Open a file for editor Socket Service
```
touch editorSocketService.js
```
- Receive message from client
```js
module.exports = function(io){
    io.on('connection', (socket) => {
        console.log(socket);
        const message = socket.handshake.query['message'];
        console.log(message);
```

- Send back message to client

```js
io.to(socket.id).emit('message', 'hehe from server');
```
- Build up a Http server in server.js
```js
const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService')(io);
```
- Open a new line for server
```js
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening(){
    console.log('App listening on port 3000')
}
```

## After testing, refactor console.log


## Get the session_id to server
- Edit Component get a "session id" from activeRoute (the same way we get that id from problem list to problem detail)

- Send id to collaboration service to tell where Url the user now located

- Collaboratoin will send the same information to editorSocketService

### Eidtor Component
- Import
```ts
import { ActivatedRoute, Params } from '@angular/router';
```
```ts
export class EditorComponent implements OnInit {
  sessionId: string;

  constructor( private collaboration: CollaborationService,
  private route: ActivatedRoute) { }

  
```
- In ngOnInit, get id first by route params senging into "sessionId" and call initEditor (Make those methods a function)

- Send editor and session id when using clollaboration init 

- collaboration.init(this.editor, this.sessionId)

- add lastAppliedChange in editor to set up collaboration socket

- When there's change happened ,register change callback --> to collaboration.service
```ts
  ngOnInit() {
    this.route.params
     .subscribe(params => {
       this.sessionId = params['id'];
       this.initEditor();
     });
  }
```

```ts
initEditor(){
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    // set up collaboration secket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    
    // register changne callback
    this.editor.on('change', (e) => {
      console.log('editor change' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    })

  }
  ```

  ## Collaboration Service
  - Send in both editor and sessionId to service

  - service listen to editor component, when there's a chagne message sent in, show the change in editor(in editor component) and send the chagne delta to Server (in collaboration service)

```ts
  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: "sessionId=" + sessionId});
    this.collaborationSocket.on('change', (delta: string) => {
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }
```
- Also, send the change to Server by sockets

```ts
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }
```
- delta
```
editor change{"start":{"row":6,"column":4},"end":{"row":6,"column":5},"action":"insert","lines":["a"]}
```

## Server side - editorSocketService
- collaborations to record who is in this problem

- receive message from collaboration "{query: "sessionId=" + sessionId}", and save into sessionId

- save sessionId into socket.id (user)

- if sessionId is the first one which means not in collaboration, creates a new collaboration oject with participants

- If the sessionId is in collaboration, add sockt.id into participants

```js
module.exports = function(io){
    //collaboration sessions
    const collaborations = {};
    // map form socketId to sessionId
    const socketIdToSessionId = {};

    io.on('connection', (socket) => {
        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        if (!sessionId in collaborations) {
            collaborations[sessionId] = {
                'participants':[]
            };
        }
        collaborations[sessionId]['participants'].push(socket.id);
    });
}
```

- If Service revceive change, save the sessionId and array of participants. Then, send the changes to all participants.
```js

  socket.on('change', delta => {
      const sessionId = socketIdToSessionId[socket.id];
      if (sessionId in collaborations){
          const participants = collaborations[sessionId]['participants'];
          for (let participant of participants) {
              if (socket.id !== participant){
                  io.to(participant).emit('change', delta)
              }
          }
      } else {
          console.error('error')
      }
  });
```

## Store and restore socket session with Redis 

- collaboration service, when user
```ts
  restoreBuffer():void{
    this.collaborationSocket.emit('restoreBuffer');
  }
```

- editor component
```ts
this.collaboration.restoreBuffer();
```

## Install Redis
- In Linus
```
wget http://download.redis.io/releases/redis-3.2.6.tar.gz
tar xzf redis-3.2.6.tar.gz
cd redis-3.2.6
make
sudo make install
cd utils
sudo ./install_server.sh`
```

- oj-server
```
npm install --save redis
```

- build up a dir modules -> redisClient.js
```
mkdir modules
touch modules/redisClient.js
```

## redisClient

```js
const redis = require('redis');
const client = redis.createClient();

function set(key, value, callback) {
    client.set(key, value, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function get(key, callback) {
    client.get(key, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function expire(key, timeInSeconds) {
    client.expire(key, timeInSeconds);
}

function quit() {
    client.quit();
}

module.exports = {
    get,
    set,
    expire,
    quit,
    redisPrint: redis.print
}
```

## Import and build up redis client in editor Socket Service
```js
const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;
```

- module.exports
```js
const sessionPath = '/temp_sessions/';
```
## Logic in editorSocketService

### Check if SessionId in collaborations

- Find if user is the first one get into this problem by looking for collaborations (if there's another user) or for redis (in the timeset)

```js
if (sessionId in collaborations) {
    collaborations[sessionId]['participants'].push(socket.id);
} else {
  redisClient.get(sessionPath + '/' + sessionId, data => {
      if (data) { // there is data in radis
          console.log('session terminated perviously, pulling back from redis');
          collaborations[sessionId] = {
              'cachaedInstructions' : JSON.parse(data),
              'participants': []
          }
      } else { // create a new collaboration
          console.log('creating new session');
          collaborations[sessionId] = {
              'cachaedInstructions' : [],
              'participants': []  
          }
      }
      collaborations[sessionId]['participants'].push(socket.id);
  });
}
```
### There's change happen

- Add a cachaedInstructions if there is a sessionId in collaborations when there is a change message

```js
socket.on('change', delta => {
    const sessionId = socketIdToSessionId[socket.id];
    if(sessionId in collaborations){
        collaborations[sessionId]['cachaedInstructions'].push(['change', delta, Date.now()]);
    }
```

### Client call restore Buffer (Need to show data)

- When Client side call restore Buffer, emit out all contents saved in redis
- instruction[0] : change
- instruction[1] : content
```js
socket.on('restoreBuffer', () => {
    const sessionId = socketIdToSessionId[socket.id];
    if (sessionId in collaborations) {
        const instructions = collaborations[sessionId]['cachaedInstructions'];
        for (let instruction of instructions) {
            socket.emit(instruction[0], instruction[1]);
        }
    }
});
```

### User disconnect

- When disconnect, save content in radis
- Remove user's sessionId from participants
- See if the last user lefts (participants.length === 0)

```js
socket.on('disconnrect', () => {
  const sessionId = socketIdToSessionId[socket.id];
  let foundAndRemove = false;
  if (sessionId in collaborations) {
      const participants = collaborations[sessionId]['participants'];
      const index = participants.indexOf(socket.id);
      if (index >= 0){
          participants.slice(index, 1);
          foundAndRemove = true;
          if (participants.length === 0){ //last user
              const key = sessionPath + '/' + sessionId;
              const value = JSON.stringify(collaborations[sessionId]['cachaedInstructions']);
              redisClient.set(key, value, redisClient.redisPrint);
              redisClient.expire(key, TIMEOUT_IN_SECONDS);
              delete collaboraitons[sessionId];
          }
      }
  }
  if (!foundAndRemove) {
      console.error('warning');
  }
});

```

***

### editorSocketService.js

```js
const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;
module.exports = function(io){
//collaboration sessions
const collaborations = {};
// map form socketId to sessionId
const sessionPath = '/temp_sessions/';
const socketIdToSessionId = {};
io.on('connection', (socket) => {
    const sessionId = socket.handshake.query['sessionId'];
    socketIdToSessionId[socket.id] = sessionId;   
    // Scession id in collaborations 
    if (sessionId in collaborations) {
        collaborations[sessionId]['participants'].push(socket.id);
    } else {
        redisClient.get(sessionPath + '/' + sessionId, data => {
            if (data) { // there is data in radis
                console.log('session terminated perviously, pulling back from redis');
                collaborations[sessionId] = {
                    'cachaedInstructions' : JSON.parse(data),
                    'participants': []
                }
            } else { // create a new collaboration
                console.log('creating new session');
                collaborations[sessionId] = {
                    'cachaedInstructions' : [],
                    'participants': []  
                }
            }
            collaborations[sessionId]['participants'].push(socket.id);
        });
    }

    socket.on('change', delta => {
        const sessionId = socketIdToSessionId[socket.id];
        if(sessionId in collaborations){
            collaborations[sessionId]['cachaedInstructions'].push(['change', delta, Date.now()]);
        }
        if (sessionId in collaborations){
            const participants = collaborations[sessionId]['participants'];
            for (let participant of participants) {
                if (socket.id !== participant){
                    io.to(participant).emit('change', delta)
                }
            }
        } else {
            console.error('error')
        }
    });
    // When client side call restore Buffer
    socket.on('restoreBuffer', () => {
        const sessionId = socketIdToSessionId[socket.id];
        if (sessionId in collaborations) {
            const instructions = collaborations[sessionId]['cachaedInstructions'];
            for (let instruction of instructions) {
                socket.emit(instruction[0], instruction[1]);
            }
        }
    });
    // When disconnect, save content in radis
    socket.on('disconnrect', () => {
        const sessionId = socketIdToSessionId[socket.id];
        let foundAndRemove = false;
        if (sessionId in collaborations) {
            const participants = collaborations[sessionId]['participants'];
            const index = participants.indexOf(socket.id);
            if (index >= 0){
                participants.slice(index, 1);
                foundAndRemove = true;
                if (participants.length === 0){ //last user
                    const key = sessionPath + '/' + sessionId;
                    const value = JSON.stringify(collaborations[sessionId]['cachaedInstructions']);
                    redisClient.set(key, value, redisClient.redisPrint);
                    redisClient.expire(key, TIMEOUT_IN_SECONDS);
                    delete collaboraitons[sessionId];
                }
            }
        }
        if (!foundAndRemove) {
            console.error('warning');
        }
    });
});
}
```
### collaboration.service.ts
```ts
import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class CollaborationService {
  collaborationSocket: any
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: "sessionId=" + sessionId});
    // listener
    this.collaborationSocket.on('change', (delta: string) => {
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }
  // Send to server.js
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

  // restore socket session
  restoreBuffer():void{
    this.collaborationSocket.emit('restoreBuffer');
  }

}

```

### editor.component.ts

```ts
import { CollaborationService } from '../../services/collaboration.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  sessionId: string;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  editor: any;
  defaultContent = {
   'Java': `public class Example {
     public static void main(String[] args) {
         // Type your Java code here
     }
   }`,
   'Python': `class Solution:
   def example():
       # Write your Python code here`
  };
  constructor( private collaboration: CollaborationService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
     .subscribe(params => {
       this.sessionId = params['id'];
       this.initEditor();
       this.collaboration.restoreBuffer();
     });
  }

  initEditor(){
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    // set up collaboration secket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    // register changne callback
    this.editor.on('change', (e) => {
      console.log('editor change' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }
  
  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    const userCode = this.editor.getValue();
    console.log(userCode);
  }

}

```