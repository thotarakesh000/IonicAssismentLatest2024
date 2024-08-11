import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { users } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  UserData: users = null;
  constructor(private cache: StorageService, private router: Router) { }

  async ngOnInit() {
    let cacheData = await this.cache.getStorage("mobile")
    console.log(cacheData);
    let filterData = this.cache.userList.filter((data: users) => cacheData == data.mobileNumber);
    console.log(filterData);
    if (filterData.length > 0) {
      this.UserData = filterData[0];
    } else {
      this.router.navigate(['/register']);
    }
  }

}
