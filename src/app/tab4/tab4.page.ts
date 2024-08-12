import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { users } from '../shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  UserData: users = null;
  constructor(private cache: StorageService, private router: Router, private route: ActivatedRoute) {
    console.log("enter into tab4 constructor")
    this.route.queryParams.subscribe((params) => {
      console.log("enter into tab4 constructor params", params)
      this.getUserData();
    })

  }

  ngOnInit() {

  }
  async getUserData() {
    let cacheData = await this.cache.getStorage("mobile")
    console.log(cacheData);
    let cacheUserData: users[] = await this.cache.getStorage("UserData") as users[]
    console.log(cacheUserData);
    if (cacheUserData && cacheUserData.length > 0) {
      let filterData = cacheUserData.filter((data: users) => cacheData == data.mobileNumber);
      console.log(filterData);
      if (filterData.length > 0) {
        this.UserData = filterData[0];
      } else {
        this.router.navigate(['/register']);
      }
    }
    else {
      this.router.navigate(['/register']);
    }
  }

}
