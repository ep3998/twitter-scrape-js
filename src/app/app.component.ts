import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Socket IO Test';

  messageForm: FormGroup;

  replies: string[] = [];

  private socket: SocketIOClient.Socket;

  onSubmit() {
    this.socket.emit('test', this.prepareMessage());
  }

  revert() {
    this.messageForm.reset({
      content: ''
    });
  }

  prepareMessage(): string{
    const formModel = this.messageForm.value;
    return formModel.content;
  }

  consumeReply() {
    const self = this;
    this.socket.on('reply', function(data: string){
      console.log('data - ', data);
      self.replies.push(data);
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


}
