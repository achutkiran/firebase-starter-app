import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs';
import { Chat } from '../common-types';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  chatData: Observable<Chat[]>
  chatForm: FormGroup
  constructor(private firestoreService:FirestoreService) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      chatText: new FormControl()
    })
    this.chatData = this.firestoreService.fetchMessages()
  }


  saveChat() {
    let message:string = this.chatForm.get('chatText').value
    this.chatForm.get('chatText').setValue('')
    this.firestoreService.addMessage(message)
  }

}
