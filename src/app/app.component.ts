import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform, private alertController: AlertController, private notificationService: NotificationService) {
    this.platform.backButton.subscribeWithPriority(100, async () => {
      console.log("enter into back button");
      let data = await this.alertController.getTop();
      console.log("enter into back button data", data)
      if (data) {
        this.alertController.dismiss();
      }

      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'are you sure want to close',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: async () => {
            console.log("enter ok");
            App.exitApp();
            // Perform navigation or other action
          }
        }],
      });
      console.log("enter into back button present")

      await alert.present();

    });
  }
  ngOnInit() {
    this.platform.ready().then(async () => {
      console.log("enter into ready");
      this.notificationService.initPush();

      await SplashScreen.hide();

    })

  }
}
