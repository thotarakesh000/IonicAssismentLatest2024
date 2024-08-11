import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { LoaderService } from '../shared/services/loader.service';
import { ModalService } from '../shared/services/modal.service';
import { ApiService } from '../shared/services/api.service';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder } from '@capgo/nativegeocoder';
import { StorageService } from '../shared/services/storage.service';
import { users } from '../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  formSubmit: boolean = false;
  showImage: any = false;
  imageData: any = "";
  photos: any = [];
  constructor(private fb: FormBuilder,
    private platform: Platform,
    private cache: StorageService,
    private loader: LoaderService,
    private navctrl: NavController,
    private modalService: ModalService,
    private loginService: ApiService) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      address: [""],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      mobileNumber: ["", Validators.required],


    });

  }

  async ngOnInit() {
    let cacheData = await this.cache.getStorage("mobile")
    console.log(cacheData)
    this.registerForm.patchValue({
      mobileNumber: cacheData

    });

  }
  ionViewWillEnter() {
    this.getCurrentPosition();
  }
  async getCurrentPosition() {
    try {
      console.log('Reverse Geocode Result:');

      await Geolocation.getCurrentPosition().then(async (position) => {
        this.registerForm.patchValue({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude

        });
        console.log('Reverse Geocode Result:', position);

        try {
          const coordinates = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          };
          const result = await NativeGeocoder.reverseGeocode(coordinates);

          let addressData = result?.addresses[0].subLocality + " , " + result?.addresses[0].locality + " , " + result?.addresses[0].administrativeArea + " , " + result?.addresses[0].postalCode
          this.registerForm.patchValue({
            address: addressData

          });
          // Handle the result
        } catch (error) {
          console.error('Error performing reverse geocoding:', error);
        }
      });
      // console.log('Current Position:', position);



    } catch (error) {
      console.error('Error getting current position:', error);
    }
  }


  registerUser() {
    this.formSubmit = true;
    if (!this.registerForm.valid) {
      return;
    }
    this.loader.showLoader();
    let reqdata: users = {
      "firstName": this.registerForm.value.firstName, "lastName": this.registerForm.value.lastName,
      "latitude": this.registerForm.value.latitude, "longitude": this.registerForm.value.longitude,
      "address": this.registerForm.value.address, "email": this.registerForm.value.email,
      "mobileNumber": this.registerForm.value.mobileNumber,
    };
    this.loginService.registerUser(reqdata).subscribe((res: any) => {
      console.log("registerUser ", res);
      this.loader.hideLoader();
      // if (res.status == "success") {

      this.navctrl.navigateRoot(['/tabs'])

      // }
    }, (error) => {
      console.log("validateLoginUser ", error)
      this.loader.hideLoader();
      this.loader.showToaster(error)

      // this.t
    })
  }
  skiptoHome() {
    this.navctrl.navigateRoot(['/tabs'])
  }
}