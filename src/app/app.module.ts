import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

// Angular firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule , FirestoreSettingsToken } from '@angular/fire/firestore'; 
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Angular Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Services
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { CloudStorageService } from './cloud-storage.service';
import { MessagingService } from './messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService, 
    FirestoreService,
    CloudStorageService,
    MessagingService,
    { provide: FirestoreSettingsToken, useValue: {}} //in future versions of firesstore don't use this
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
