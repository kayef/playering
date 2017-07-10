import { Injectable } from '@angular/core';
import {CognitoUtilService} from "./cognito-util.service";
import {ReplaySubject, BehaviorSubject, Observable} from "rxjs";

declare var AWSCognito: any;
declare var AWS: any;

@Injectable()
export class UserLoginService {

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private authenticateResultSubject = new BehaviorSubject<any>({});
  public authenticateResult = this.authenticateResultSubject.asObservable();

  constructor(
    public cognitoUtil:CognitoUtilService
  ) { }

  checkAuthenticated() {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(
        (err, session) => {
          if (err) {
            console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
            //update to the caller that we are not logged in and pass the error back
            this.isAuthenticatedSubject.next(false);
          }
          else {
            console.log("UserLoginService: Session is " + session.isValid());
            //update to the caller that we are logged in and this session is valid
            this.isAuthenticatedSubject.next(true);
          }
        });
    }
    else {
      console.log("UserLoginService: can't retrieve the current user");
      //update the caller that we can't retrieve the current user
      this.isAuthenticatedSubject.next(false);
    }

    return this.isAuthenticated;
  }

  authenticate(email: string, password: string): Observable<any> {
    console.log('UserLoginService: Starting authentication');

    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

    let authenticationData = {
      Username: email,
      Password: password
    }

    let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    let userData = {
      Username: email,
      Pool: this.cognitoUtil.getUserPool()
    };

    console.log("UserLoginService: Params set...Authenticating the user");

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    console.log("UserLoginService: config is " + AWS.config);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        this.isAuthenticatedSubject.next(true);
        this.authenticateResultSubject.next(null);
      },
      onFailure: (err) => {
        this.authenticateResultSubject.next(err);
      }
    })

    return this.authenticateResult;
  }

  logout() {
    this.cognitoUtil.getCurrentUser().signOut();
    this.isAuthenticatedSubject.next(false);
  }

}
