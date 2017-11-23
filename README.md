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
