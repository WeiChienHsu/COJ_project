import { Component, OnInit } from '@angular/core';

declare const ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['Java'])
  }


  private newMethod(): any {
    return "ace/theme/eclipse";
  }
}
