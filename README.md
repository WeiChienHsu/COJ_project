# COJ_project
# Week1
***
## Document Introduction

### e2e / karma.conf.js / protractor.cong.js 
`
For testing
`

### node_modules
`
Made by npm, then, npm will install libraries by package.json file
`

### gitignore 
`
Marked documents don't need to be uploaed eg. dependencies/node_module
`

### .angular-cli.json
* apps -> root -> src : the startpoint of our app
* outDir -> "dist" : files need to be uploaded (we'll change in the future)
* style -> style.css : global stylesheets (eg. bootstrap)

### src
#### Template(VIEW)
`
Composing HTML templates with Angularized markup 
`
#### Component(Model)
`
Classes to manage or support the templates. Interacting with the VIEW through an API of properites and methods. 
`
```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

#### Service
`
Adding application logic. Almost anything can be a service. (Logic Service / Data Service etc.)
`

#### Module
`
Boxing components and services. (收納箱)
`
***
