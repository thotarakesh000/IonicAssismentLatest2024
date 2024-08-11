import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { OtppinComponent } from '../shared/component/otppin/otppin.component';
import { StorageService } from '../shared/services/storage.service';
import { NumberOnlyDirective } from '../shared/directives/common.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, OtppinComponent, NumberOnlyDirective],
  providers: []
})
export class LoginPageModule { }
