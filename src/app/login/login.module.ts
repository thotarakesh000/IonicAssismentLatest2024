import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { OtppinComponent } from '../shared/component/otppin/otppin.component';
import { NumberOnlyDirective } from '../shared/directives/common.directive';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgOtpInputModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, OtppinComponent, NumberOnlyDirective],
  providers: []
})
export class LoginPageModule { }
