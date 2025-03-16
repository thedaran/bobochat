import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket;
  private messagesSubject = new Subject<string>();
  
  constructor() {
    this.socket = new WebSocket("ws://localhost:6789");

    this.socket.onopen = () => {
      console.log(
        "%c连接到 WebSocket 服务器",
        "background: yellow; color: red; margin: 2rem; border-radius: 0.000px; font-weight: 800; font-size: 17.555px; padding: 10px;"
      );
    };

    this.socket.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    this.socket.onclose = () => {
      console.log("与 WebSocket 服务器断开连接");
    };
  }

  sendMessage(message: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket 未连接。.");
    }
  }

  getMessages(): Observable<string> {
    return this.messagesSubject.asObservable();
  }
}
