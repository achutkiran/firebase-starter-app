import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap } from 'rxjs/operators'

@Injectable()
export class MessagingService {

  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission(){
    this.afMessaging.requestToken
      .subscribe(
        (token) => { console.log('Permission granted!')},
        (error) => { console.error(error);}
      );
  }

  deleteToken(){
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => {console.log('Deleted!')}
      )
  }

}
