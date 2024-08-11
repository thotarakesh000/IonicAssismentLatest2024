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

    { name: "Hdfc Bank", price: "100000", rating: "4.5", banner: 'assets/cards/card1.png' },
    { name: "Axis Bank", price: "50000", rating: "4.6", banner: 'assets/cards/card2.png' },
    { name: "ICICI Bank", price: "75000", rating: "4.8", banner: 'assets/cards/card3.png' },
    { name: "DBS Bank ", price: "80000", rating: "4.2", banner: 'assets/cards/card4.png' },
    { name: "Kotak Mahindra Bank", price: "60000", rating: "4.4", banner: 'assets/cards/card5.png' },
    { name: "indusind Bank", price: "90000", rating: "4.7", banner: 'assets/cards/card6.png' },
    { name: "Yes Bank", price: "85000", rating: "4.3", banner: 'assets/cards/card7.png' },
  ];
  constructor() { }
  onSlideChange(event: any) {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
    console.log('event', event);
  }

}
