import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Info } from '../services/Info.service';

interface row {
  images: [{
    path: string,
    title: string,
    description: string
  }];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit{

  constructor(private authFire: Auth, public info: Info, public auth: AuthentificationService, private router: Router) { }

  ngOnInit() {
    console.log("init");
    if (this.authFire.currentUser)
      this.authFire.currentUser.getIdToken(true)
        .then((token) => {
          console.log(token);
          this.info.bearer = token;
        });
    else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout()
    this.info.bearer = "";
    this.info.connected = false;
  }
}
