import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { users } from '../shared/models/user';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  retrivedOTP = "";
  userList = [];
  step1 = true;
  step2 = false;
  constructor(private apiservice: ApiService, private router: Router, private cache: StorageService) {
    this.initForm();
    this.getUserData();
  }

  ngOnInit() { }

  initForm() {
    this.form = new FormGroup({
      mobile: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  getUserData() {
    this.apiservice.getUserData().subscribe((res: users[]) => {
      console.log("res ", res);
      this.userList = res;
    });
  }
  onSubmit() {
    console.log(this.form);
    let mobile = this.form.value.mobile;
    if (this.form.valid) {
      let filterData = this.userList.filter((data: users) => mobile == data.mobile);
      if (filterData.length > 0) {
        //user already exist
        this.router.navigate(['/tabs'])

      } else {
        //navigate to new registration
        this.router.navigate(['/register'])
      }
    }
  }
  skiptoHome() {
    this.router.navigate(['/register'])
  }
  onOtpChange(event) {
    console.log("event ", event)
  }
}
