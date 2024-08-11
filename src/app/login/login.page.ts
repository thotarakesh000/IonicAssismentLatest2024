import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { users } from '../shared/models/user';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { CustomValidators } from '../shared/services/custom-validator.service';
import { OtppinComponent } from '../shared/component/otppin/otppin.component';
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
  constructor(private apiservice: ApiService, private router: Router,
    public fb: FormBuilder, private cache: StorageService) {
    this.initForm();
    this.getUserData();
  }

  ngOnInit() { }

  initForm() {
    this.form = this.fb.group({
      mobile: [null, [Validators.required, CustomValidators.mobileValidator]],
      otp: ['', [Validators.required, Validators.minLength(6)]],

    });
  }
  getUserData() {
    this.apiservice.getUserData().subscribe((res: users[]) => {
      console.log("res ", res);
      this.userList = res;
    });
  }
  sendOtp() {
    let mobile = this.form.controls["mobile"];
    if (mobile?.valid) {
      this.step2 = true;
      this.step1 = false;
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
        this.router.navigate(['/tabs'])

      } else {
        //navigate to new registration
        this.router.navigate(['/register'])
      }
    }
  }

  onOtpChange(event) {
    console.log("event ", event);
    this.form.get('otp')?.patchValue(event);
  }
}
