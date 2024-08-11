import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ToastController } from '@ionic/angular';
import { ScreenOrientation, ScreenOrientationResult } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  scrollTo = null;
  orientation: any;
  isPortrait = true;
  lock = false;

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport
  constructor(public apiService: ApiService, private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.checkOrientation();
  }

  async checkOrientation() {
    ScreenOrientation.addListener(
      'screenOrientationChange',
      (orientation: ScreenOrientationResult) => {
        console.log("enter into screenOrientationChange ", orientation)
        if (orientation) this.checkPortrait(orientation);
      }
    );
    const orientation = await ScreenOrientation.orientation();
    if (orientation) this.checkPortrait(orientation);
  }
  checkPortrait(orientation: ScreenOrientationResult) {
    console.log(orientation);
    this.orientation = orientation;
    const pattern = /portrait/;
    if (this.orientation?.type.match(pattern)) {
      this.isPortrait = true;
      this.unlockOrientation();
    } else {
      this.isPortrait = false;
      this.movetoLandscape();
    }
    console.log(this.isPortrait);
  }
  async movetoLandscape() {
    console.log("enter into movetoLandscape isPortrait ", this.isPortrait, " orientation ", this.orientation);

    await ScreenOrientation.unlock();
    await ScreenOrientation.lock({
      orientation: 'landscape'
    });
  }
  async lockOrientation(orientationType?: OrientationType) {
    await ScreenOrientation.lock({
      orientation: orientationType || 'portrait'
    });
  }

  async unlockOrientation() {
    await ScreenOrientation.unlock();
  }

  toggleLock() {
    this.lock = !this.lock;
    if (this.lock) {
      this.lockOrientation(this.orientation?.type);
    }
    else this.unlockOrientation();
    this.checkPortrait(this.orientation);
  }


  scrolltoIndex() {
    if (this.scrollTo > -1) {
      this.viewport.scrollToIndex(this.scrollTo, 'smooth')
    }
  }
  async selectedItem(id) {
    const toast = await this.toastCtrl.create({
      message: id, duration: 1500
    });
    toast.present();
  }
  ngOnDestroy(): void {
    ScreenOrientation.removeAllListeners();

  }
}
