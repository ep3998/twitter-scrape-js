import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  sequence
} from '@angular/animations';

export class Reply {
  message: string;
  time: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('replyState', [
      transition('void => *', [
        style({height: '0', opacity: '0', scale: 0}),
        // animate(500, keyframes([
        //   style({opacity: 0, transform: 'scale(0)', offset: 0}),
        //   style({opacity: 1, transform: 'scale(1)', offset: 1.0})
        // ]))
        sequence([
          animate('.5s ease-in', style({height: '*', opacity: 1, transform: 'scale(1)'}))
        ])
      ]),
      transition('* => void', [
        state('in', style({height: '*'})),
        // animate('.5s ease-in-out',
        //   style({transform: 'scale(0)', height: '*'})),
        sequence([
          // animate('.1s ease', style({height: '*', opacity: '.5'})),
          animate('.5s ease-out', style({height: '0', opacity: '0', transform: 'scale(0)' }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Socket IO Test';

  messageForm: FormGroup;

  replies: Reply[] = [];

  private socket: SocketIOClient.Socket;

  onSubmit() {
    this.socket.emit('test', this.prepareMessage());
  }

  revert() {
    this.messageForm.reset({
      content: ''
    });
  }

  prepareMessage(): string {
    const formModel = this.messageForm.value;
    return formModel.content;
  }

  consumeReply() {
    const self = this;
    this.socket.on('reply', function(data: Reply){
      self.replies.push(data);

      const len = self.replies.length;
      if (len > 5) {
        self.replies.shift();
      }
    });
  }

  constructor(private fb: FormBuilder) {
    this.createForm();

    this.socket = io('http://localhost:7080');
    this.consumeReply();

  }

  createForm() {
    this.messageForm = this.fb.group({
      content: ''
    });
  }

  isTimeWarning(reply: Reply): boolean {
    return reply.time > 150;
  }

}
