import { Component, OnInit } from '@angular/core';
import { MessagingService } from './messaging.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token:Observable<string>;
   
  constructor(private messageService:MessagingService) { }

  ngOnInit(){
    this.messageService.fetchTokenAndSave()
  }

 
}
