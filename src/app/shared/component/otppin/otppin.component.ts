import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { users } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otppin',
  templateUrl: './otppin.component.html',
  styleUrls: ['./otppin.component.scss'],
})
export class OtppinComponent implements OnInit {

  @Input() phone;
  isLoading = false;
  otp: string;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService,
    private cache: StorageService,
    private router: Router
  ) { }

  ngOnInit() { }

  showLoader(msg?) {
    if (!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg ? msg : "lodaing",
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
      .catch(e => {
        this.isLoading = false;
        console.log(e);
      })
  }

  hideLoader() {
    if (this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log(e));
  }

  onOtpChange(event) {
    this.otp = event;
    console.log(this.otp);
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber('+91' + this.phone);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    try {
      this.showLoader();
      const response = await this.auth.verifyOtp(this.otp);
      console.log(response);
      let filterData = this.cache.userList.filter((data: users) => this.phone == data.mobileNumber);
      this.hideLoader();
      this.modalCtrl.dismiss();
      if (filterData.length > 0) {
        //user already exist
        this.router.navigate(['/tabs'])

      } else {
        //navigate to new registration
        this.router.navigate(['/register'])
      }


    } catch (e) {
      console.log(e);
      this.hideLoader();
      this.modalCtrl.dismiss();
    }

  }
}
