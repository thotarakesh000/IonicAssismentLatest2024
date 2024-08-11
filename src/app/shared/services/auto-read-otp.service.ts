import { Injectable } from '@angular/core';
import { SmsRetriever } from '@ionic-native/sms-retriever';

@Injectable({
  providedIn: 'root'
})
export class AutoReadOtpService {
  hashData: any;
  watchOtp: any;
  constructor() { }
  getAppHash() {
    SmsRetriever.getAppHash()
      .then((res: any) => { console.log(res); this.hashData = res; })
      .catch((error: any) => console.error(error))
  }
  startWatching() {
    SmsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        if (res.Message != -1) {
          this.watchOtp = res.message.slice(0, 6);
          // console.log("retrive otp", this.retrivedOTP);
        }
      })
      .catch((error: any) => console.error(error));
  }
}
