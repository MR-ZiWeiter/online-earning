import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import lottie from 'lottie-web';
import { LottieConfig } from './lottie';

@Component({
  selector: 'swipe-core-public-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss']
})

export class LottieComponent implements OnInit {

  @ViewChild('lottie', {static: true}) public lottieDom: any;

  public lottieWeb: object;

  @Input() private lottieWebConfig: LottieConfig;

  constructor() { }

  ngOnInit() {
    console.log(this.lottieDom.nativeElement);
    this.lottieWeb = lottie.loadAnimation(Object.assign({
      container: this.lottieDom.nativeElement,
      ...this.lottieWebConfig
    }));
  }

}
