import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap, tap } from 'rxjs/operators'
import { FirestoreService } from './firestore.service';
import { of, Observable } from 'rxjs';

@Injectable()
export class MessagingService {
  constructor(private afMessaging: AngularFireMessaging, private firestoreService: FirestoreService) { }

  requestPermission(){
    this.afMessaging.requestToken
      .subscribe(
        (token) => { 
          console.log('Permission granted!', token);
          if(token)
            this.firestoreService.addToken(token);
        },
        (error) => { console.error(error);}
      );
  }

  fetchTokenAndSave(){
    this.afMessaging.getToken
      .subscribe(
        (token) =>{
          if (token){
            this.firestoreService.addToken(token);
          }
          else{
            this.requestPermission()
          }
        },
        (error) => {console.error("Failed to request token")}
      )
  }

  // deleteToken(){
  //   this.afMessaging.getToken
  //     .pipe(tap(token => console.log(token)),
  //       mergeMap(token => this.afMessaging.deleteToken(token)))
  //     .subscribe(
  //       (token) => {
  //         console.log('Deleted!',token)
  //       }
  //     )
  // }

  // getToken():Observable<string>{
  //   return this.afMessaging.getToken
  // }

  listen(){
    this.afMessaging.messages
      .subscribe((message) => { console.log(message)})
  }

}
