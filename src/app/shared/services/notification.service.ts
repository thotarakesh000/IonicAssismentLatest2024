import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
export const FCM_TOKEN = 'push_notification_token'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _redirect = new BehaviorSubject<any>(null);
  get redirect() {
    return this._redirect.asObservable();
  }
  constructor(private storage: StorageService) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  async registerPush() {
    try {
      await this.addListners();
      let permission = await PushNotifications.checkPermissions();
      if (permission.receive == "prompt") {
        permission = await PushNotifications.requestPermissions();
      }
      if (permission.receive != "granted") {
        throw new Error("user denied permission")
      }
      await PushNotifications.register();
    } catch (exception) {
      console.log(exception);

    }

  }
  addListners() {

    PushNotifications.addListener('registration', async (token: Token) => {
      console.log("token ", token);
      const fcm_token: any = (token?.value);
      let go = 1;
      const saved_token = JSON.parse((await this.storage.getName(FCM_TOKEN)).value);
      if (saved_token) {
        if (saved_token == fcm_token) {
          console.log("same token");
          go = 0;
        } else {
          go = 2
        }

      }
      if (go == 1) {
        this.storage.setName(FCM_TOKEN, JSON.stringify(fcm_token))
      } else if (go == 2) {
        let data = {
          expired_token: saved_token, refreshed_token: fcm_token
        }
        this.storage.setName(FCM_TOKEN, JSON.stringify(fcm_token))

      }

    });
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log("registrationError ", JSON.stringify(error));

    });
    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      console.log("pushNotificationReceived ", JSON.stringify(notification));
      let data = notification?.data;
      if (data?.redirect) {
        this._redirect.next(data?.redirect)
      }

    })
    PushNotifications.addListener('pushNotificationActionPerformed', async (action: ActionPerformed) => {
      let data = action.notification.data;
      console.log("pushNotificationActionPerformed ", JSON.stringify(action.notification));
      console.log("pushNotificationActionPerformed data", data);
      if (data?.redirect) {
        this._redirect.next(data?.redirect)
      }


    })
  }
  async getDeliverNotifications() {
    let notificationList = await PushNotifications.getDeliveredNotifications();
    console.log("delivered notifications ", notificationList);

  }

  async removeToken() {
    try {
      const saved_token = JSON.parse((await this.storage.getName(FCM_TOKEN)).value);
      this.storage.removeName(saved_token)
    } catch (ex) {
      console.log(ex);

    }

  }
}
