import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  chatForm: FormGroup
  constructor() { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      chatText: new FormControl()
    })
  }

}
