import { Injectable } from '@angular/core';

declare var AWSCognito:any;

@Injectable()
export class CognitoUtilService {

  public static _REGION = "us-west-2";

  //public static _IDENTITY_POOL_ID = "us-west-2_1sZMY4uOA";
  public static _USER_POOL_ID = "us-west-2_1sZMY4uOA";
  public static _CLIENT_ID = "23v8ngr71aplm3hfrqgn0m39b1";

  public static _POOL_DATA = {
    UserPoolId: CognitoUtilService._USER_POOL_ID,
    ClientId: CognitoUtilService._CLIENT_ID
  };


  getUserPool() {
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoUtilService._POOL_DATA);
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }
}
