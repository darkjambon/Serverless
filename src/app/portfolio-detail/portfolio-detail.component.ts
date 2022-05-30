import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Info } from '../services/Info.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageService } from '../services/image.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {
  private routeSub: any;
  src: any;
  message: string = '';
  constructor(public imageService: ImageService, public info: Info, private route: ActivatedRoute) { }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.imageService.images.forEach((list: any) => {
        console.log(list);
        list.imageList.forEach((e: any) => {
          console.log(e);
          if (e.title == params['id']) { this.src = e; }
        })
      })
    })
    this.requestPermission();
    this.listen();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  title = 'af-notification';
  messageGet: any = null;
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.messageGet = payload;
    });
  }

}
