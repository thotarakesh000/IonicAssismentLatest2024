import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  page = 0;
  perPage = 10;

  listData: any[] = [];
  constructor(private apiService: ApiService, private platform: Platform, private router: Router) {
    console.log("enter into tab2");
    this.listData = [];
    this.platform.backButton.subscribeWithPriority(100, async (processNextHandler) => {
      console.log("enter into back button")
      if (this.router.url.includes("tabs/tab2")) {
        this.closeBrowser();
      } else {
        processNextHandler();
      }
    });
  }
  ngOnInit(): void {
    this.listData = this.paginateArray();
  }
  paginateArray() {
    this.page++;
    return this.apiService.arrayData.filter(x => x.id > (this.page * this.perPage - this.perPage) && x.id <= (this.page * this.perPage))
  }
  loadMore(event) {
    console.log(event)
    setTimeout(() => {
      const array = this.paginateArray();
      this.listData = this.listData.concat(array);
      (event as InfiniteScrollCustomEvent).target.complete();
      if (array?.length < this.perPage) {
        (event as InfiniteScrollCustomEvent).target.disabled = true;

      }
    }, 1500);
  }
  async openBrowser(url) {
    await Browser.open({ url: url });
    Browser.addListener('browserFinished', () => {
      console.log('browser finished');
    });
  }
  async closeBrowser() {
    await Browser.close();
  }
}
