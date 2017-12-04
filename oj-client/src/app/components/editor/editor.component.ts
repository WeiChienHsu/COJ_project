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
  constructor( private collaboration: CollaborationService) { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();
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