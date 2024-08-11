import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  arrayData: any[] = [
    {
      "id": 1,
      "name": "Hdfc Bank 1",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'
    },
    {
      "id": 2,
      "name": "Hdfc Bank 2",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'

    },
    {
      "id": 3,
      "name": "Hdfc Bank 3",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'

    },
    {
      "id": 4,
      "name": "Hdfc Bank 4",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'

    },
    {
      "id": 5,
      "name": "Hdfc Bank 5",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'

    },
    {
      "id": 6,
      "name": "Hdfc Bank 6",
      "email": "hfgcbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.hdfcbank.com/netbanking/'

    },
    {
      "id": 7,
      "name": "Axis Bank 1",
      "email": "Axisbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://omni.axisbank.co.in/axisretailbanking/'

    },
    {
      "id": 8,
      "name": "Axis Bank 2",
      "email": "Axisbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://omni.axisbank.co.in/axisretailbanking/'

    },
    {
      "id": 9,
      "name": "Axis Bank 3",
      "email": "Axisbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://omni.axisbank.co.in/axisretailbanking/'

    },
    {
      "id": 10,
      "name": "Axis Bank 4",
      "email": "Axisbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://omni.axisbank.co.in/axisretailbanking/'

    },
    {
      "id": 11,
      "name": "Axis Bank 5",
      "email": "Axisbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://omni.axisbank.co.in/axisretailbanking/'

    },
    {
      "id": 12,
      "name": "ICICI Bank 1",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },
    {
      "id": 13,
      "name": "ICICI Bank 2",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },
    {
      "id": 14,
      "name": "ICICI Bank 3",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },
    {
      "id": 15,
      "name": "ICICI Bank 4",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },
    {
      "id": 16,
      "name": "ICICI Bank 5",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },

    {
      "id": 16,
      "name": "ICICI Bank 5",
      "email": "ICICIbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&ITM=nli_cms_IB_internetbanking_login_btn&_gl=1*18v3v5t*_ga*NDQ5MDk5NTkyLjE2NTE2NTQ0NTY.*_ga_SKB78GHTFV*MTY1MjE1OTY1My44NS4xLjE2NTIxNjYzMDAuNTc.&_ga=2.152008317.535018192.1723304463-1422676928.1723304463'

    },
    {
      "id": 17,
      "name": "DBS Bank 1",
      "email": "Dbsbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://internet-banking.retail.dbsbank.in/login'

    },
    {
      "id": 18,
      "name": "DBS Bank 2",
      "email": "Dbsbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://internet-banking.retail.dbsbank.in/login'

    },
    {
      "id": 19,
      "name": "DBS Bank 3",
      "email": "Dbsbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://internet-banking.retail.dbsbank.in/login'

    },
    {
      "id": 20,
      "name": "DBS Bank 4",
      "email": "Dbsbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://internet-banking.retail.dbsbank.in/login'

    },
    {
      "id": 21,
      "name": "Kotak Mahindra Bank 1",
      "email": "Dbsbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.kotak.com/knb2/'

    },
    {
      "id": 22,
      "name": "Kotak Mahindra Bank 2",
      "email": "kotakbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.kotak.com/knb2/'

    },
    {
      "id": 23,
      "name": "Kotak Mahindra Bank 3",
      "email": "kotakbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.kotak.com/knb2/'

    },
    {
      "id": 24,
      "name": "Kotak Mahindra Bank 4",
      "email": "kotakbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.kotak.com/knb2/'

    },
    {
      "id": 25,
      "name": "Kotak Mahindra Bank 5",
      "email": "kotakbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://netbanking.kotak.com/knb2/'

    },
    {
      "id": 26,
      "name": "indusind Bank 1",
      "email": "indusindbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://indusnet.indusind.com/corp/BANKAWAY?Action.RetUser.Init.001=Y&AppSignonBankId=234&AppType=corporate&CorporateSignonLangId=001'

    },
    {
      "id": 27,
      "name": "indusind Bank 2",
      "email": "indusindbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://indusnet.indusind.com/corp/BANKAWAY?Action.RetUser.Init.001=Y&AppSignonBankId=234&AppType=corporate&CorporateSignonLangId=001'

    },
    {
      "id": 28,
      "name": "indusind Bank 3",
      "email": "indusindbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://indusnet.indusind.com/corp/BANKAWAY?Action.RetUser.Init.001=Y&AppSignonBankId=234&AppType=corporate&CorporateSignonLangId=001'

    },
    {
      "id": 29,
      "name": "indusind Bank 4",
      "email": "indusindbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://indusnet.indusind.com/corp/BANKAWAY?Action.RetUser.Init.001=Y&AppSignonBankId=234&AppType=corporate&CorporateSignonLangId=001'

    },
    {
      "id": 30,
      "name": "indusind Bank 5",
      "email": "indusindbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://indusnet.indusind.com/corp/BANKAWAY?Action.RetUser.Init.001=Y&AppSignonBankId=234&AppType=corporate&CorporateSignonLangId=001'

    },
    {
      "id": 31,
      "name": "Yes Bank 1",
      "email": "yesbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://yesonline.yesbank.co.in/index.html?module=login'

    },
    {
      "id": 32,
      "name": "Yes Bank 2",
      "email": "yesbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://yesonline.yesbank.co.in/index.html?module=login'

    },
    {
      "id": 33,
      "name": "Yes Bank 3",
      "email": "yesbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://yesonline.yesbank.co.in/index.html?module=login'

    },
    {
      "id": 34,
      "name": "Yes Bank 4",
      "email": "yesbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://yesonline.yesbank.co.in/index.html?module=login'

    },
    {
      "id": 35,
      "name": "Yes Bank 5",
      "email": "yesbank1@gmail.in",
      "phone": "+1 (913) 497-2020",
      "url": 'https://yesonline.yesbank.co.in/index.html?module=login'

    },
  ];
  constructor(private http: HttpClient) { }
  getValidateUser(data: users) {
    return this.http.post(environment.baseurl + "users", data)
  }
  getUserData() {
    return this.http.get<users[]>(environment.baseurl + "users")
  }
  registerUser(req: any) {
    return this.http.post(environment.baseurl + "users", req)
  }
}
