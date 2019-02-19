import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/app';
import {firestore} from "firebase/app"
import { Observable } from 'rxjs';
import { Chat } from './common-types';

@Injectable()
export class FirestoreService {
  user:User;
  constructor(private afs: AngularFirestore, private authService:AuthService) { 
    this.authService.user()
      .subscribe(user =>{
        this.user = user
      })

  }

  addMessage(messageText:string){
    this.afs.collection('messages').add({
      name: this.user.displayName,
      text: messageText,
      profilePicUrl: this.user.photoURL,
      timestamp: firestore.FieldValue.serverTimestamp()
    })
    .catch(error => {
      console.error('Error writing new message to Firebase database', error)
    })
  }

  createPlaceHolderforImage() {
    return this.afs.collection('messages').add({
      name: this.user.displayName,
      imageUrl: "",
      profilePicUrl: this.user.photoURL,
      timestamp: firestore.FieldValue.serverTimestamp()
    })
  }

  updateImageUrl(messageRef:DocumentReference,url:string,fullPath:string){
    messageRef.update({
      imageUrl: url,
      storageUri: fullPath
    })
  }

  fetchMessages():Observable<Chat[]>{
    return this.afs.collection<Chat>('messages', ref => 
      ref.orderBy('timestamp','desc')
        .limit(12)    
    ).valueChanges()
  }
}

