import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class CollaborationService {
  collaborationSocket: any
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: "sessionId=" + sessionId});
  }

  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

}
