import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

// Angular firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule , FirestoreSettingsToken } from '@angular/fire/firestore'; 
import { AngularFireStorageModule } from '@angular/fire/storage';

// Angular Material imports
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


// Services
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { CloudStorageService } from './cloud-storage.service';

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
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [
    AuthService, 
    FirestoreService,
    CloudStorageService,
    { provide: FirestoreSettingsToken, useValue: {}} //in future versions of firesstore don't use this
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
