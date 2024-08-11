import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiperModules = [IonicSlides];
  slides: any[] = [

    { banner: 'assets/cards/card1.png' },
    { banner: 'assets/cards/card2.png' },
    { banner: 'assets/cards/card3.png' },
    { banner: 'assets/cards/card4.png' },
    { banner: 'assets/cards/card5.png' },
    { banner: 'assets/cards/card6.png' },
    { banner: 'assets/cards/card7.png' },
  ];
  constructor() { }
  onSlideChange(event: any) {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
    console.log('event', event);
  }

}
