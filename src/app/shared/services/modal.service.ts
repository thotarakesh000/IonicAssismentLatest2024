import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  async closeModal(data: any) {
    let checkModal = await this.modalCtrl.getTop();
    if (checkModal) {
      this.modalCtrl.dismiss(data);
    }
  }
}
