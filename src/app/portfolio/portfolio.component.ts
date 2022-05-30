import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ImageService } from '../services/image.service';
import { Info } from '../services/Info.service';

interface row {
  images: any[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  @Input() pseudo: string = "";
  ngOnInit(): void {
    this.init();
  }
  source: string[] = []

  rows: row[] = [];

  constructor(public imageService: ImageService, private info: Info) {
    imageService.bearer = info.bearer;
    imageService.listMyFiles().subscribe((e: any) => {
      e.forEach((a: any) => {
        console.log(a.filepath);
        imageService.getImageFromService(a.filepath);
      })
      this.init();
    })
  }

  init() {
    this.imageService.images = [];
    this.imageService.index = 0;
  }
}
