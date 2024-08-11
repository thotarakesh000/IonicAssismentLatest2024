import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { users } from '../shared/models/user';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { CustomValidators } from '../shared/services/custom-validator.service';
import { OtppinComponent } from '../shared/component/otppin/otppin.component';
import { AuthService } from '../shared/services/auth.service';
import { LoadingController, ModalController, ModalOptions } from '@ionic/angular';
import { LoaderService } from '../shared/services/loader.service';
import { AutoReadOtpService } from '../shared/services/auto-read-otp.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('otp', { static: false }) pinOtpEl: OtppinComponent;

  form: FormGroup;
  retrivedOTP = "";
  userList = [];
  step1 = true;
  step2 = false;
  constructor(private autoOtpService: AutoReadOtpService, private router: Router, private auth: AuthService,
    public fb: FormBuilder, private cache: StorageService, private modalCtrl: ModalController,
    public loadingCtrl: LoaderService,
  ) {
    this.initForm();
  }

  ngOnInit() { }

  initForm() {
    this.form = this.fb.group({
      mobile: [null, [Validators.required, CustomValidators.mobileValidator]],
      otp: ['', [Validators.required, Validators.minLength(6)]],

    });
  }
  async sendOtp() {
    let mobile = this.form.controls["mobile"];
    if (mobile?.valid) {
      this.autoOtpService.startWatching();

      this.loadingCtrl.showLoader();
      this.step2 = true;
      this.step1 = false;
      const response = await this.auth.signInWithPhoneNumber('+91' + this.form.value.mobile);
      console.log(response);
      this.cache.setStorage("mobile", this.form.value.mobile)
      this.loadingCtrl.hideLoader();
      const options: ModalOptions = {
        component: OtppinComponent,
        componentProps: {
          phone: this.form.value.mobile
        },
        // swipeToClose: true
      };

      const modal = this.modalCtrl.create(options);
      (await modal).present();
      const data: any = (await modal).onWillDismiss();
      console.log(data, "otp ", this.autoOtpService.watchOtp);
    }
  }
  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      let mobile = this.form.value.mobile;
      this.cache.setStorage("mobile", mobile)
      let filterData = this.userList.filter((data: users) => mobile == data.mobileNumber);
      if (filterData.length > 0) {
        //user already exist
        this.router.navigate(['/tabs']);
        this.cache.setStorage("isRegistered", true)


      } else {
        //navigate to new registration
        this.router.navigate(['/register']);
        this.cache.setStorage("isRegistered", false)

      }
    }
  }

  onOtpChange(event) {
    console.log("event ", event);
    this.form.get('otp')?.patchValue(event);
  }
}
