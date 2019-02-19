import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import {User} from 'firebase/app'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user:User
  userSubscription: Subscription
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user().subscribe(u =>{
      this.user = u;
    });  
  }

  logout() {
    this.authService.logout()  
  }

  login(){
    this.authService.login()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

}
