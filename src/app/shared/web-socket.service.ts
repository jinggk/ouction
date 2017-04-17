import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  ws: WebSocket;
  constructor() { }

  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onopen = (event) => this.sendMessageToServer({ productId: id });
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = () => observer.complete();
        return () => this.ws.close();
      }
    ).map(message => JSON.parse(message));
  }

  sendMessageToServer(message: any) {
    this.ws.send(JSON.stringify(message));
  }

}
