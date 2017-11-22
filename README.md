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


