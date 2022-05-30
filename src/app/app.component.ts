import { Component, OnInit } from '@angular/core';
import { Info } from './services/Info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  events: string[] = [];
  opened: boolean = false;

  constructor(public info: Info) {}
}
