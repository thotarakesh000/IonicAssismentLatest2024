import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import { StorageService } from './shared/services/storage.service';
import { ModalService } from './shared/services/modal.service';
import { LoaderService } from './shared/services/loader.service';
import { NotificationService } from './shared/services/notification.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ApiService, StorageService, ModalService, LoaderService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
