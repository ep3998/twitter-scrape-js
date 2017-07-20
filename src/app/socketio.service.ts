import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketioService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

  emitTest(message) {
    this.socket.emit('test', message);
  }

  consumeReply(): string {
    var self = this;
    var reply: string;
    this.socket.on('reply', function(data: string){
      reply = data;
    });

    return reply;
  }
}
