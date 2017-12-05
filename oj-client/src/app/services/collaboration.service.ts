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
