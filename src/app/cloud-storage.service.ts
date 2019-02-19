import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';
import { User } from 'firebase/app';

@Injectable()
export class CloudStorageService {
  user:User
  constructor(private storage: AngularFireStorage, private firestoreService:FirestoreService, private authService:AuthService) {
    this.authService.user()
      .subscribe(u => {
        this.user = u
      })
  }

  uploadFile(file:File){
    this.firestoreService.createPlaceHolderforImage()
    .then(messageRef =>{
      let filePath = this.user.uid + '/' + messageRef.id + '/' + file.name;
      let task = this.storage.upload(filePath,file)
      task.then(fileSnapshot =>{
        fileSnapshot.ref.getDownloadURL()
          .then(url =>{
            this.firestoreService.updateImageUrl(messageRef,url,fileSnapshot.metadata.fullPath)
          })
      })
    })
  }
}
