import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RegisterUser} from "../../models/register-user.model";
import {CognitoUtilService} from "./cognito-util.service";
import {UserLoginService} from "./user-login.service";

declare var AWSCognito: any;

@Injectable()
export class RegisterUserService {

  private user:RegisterUser;

  private registerResultSubject = new BehaviorSubject<any>({});
  public registerResult = this.registerResultSubject.asObservable();

  private registerConfirmationSubject = new BehaviorSubject<any>({});
  public registerConfirmation = this.registerConfirmationSubject.asObservable();

  private resendConfirmationCodeSubject = new BehaviorSubject(<any>({}));
  public resendConfirmationCode = this.resendConfirmationCodeSubject.asObservable();

  constructor(
    private cognitoUtil: CognitoUtilService,
    private userLoginService: UserLoginService
  ) { }

  registerUser(registerUser: RegisterUser):Observable<any> {

    this.user = registerUser;

    let attributeList = [];

    let dataEmail = {
      Name: 'email',
      Value: registerUser.email
    };

    let dataNickname = {
      Name: 'nickname',
      Value: registerUser.name
    };

    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

    this.cognitoUtil.getUserPool().signUp(registerUser.email, registerUser.password, attributeList, null,
      (err, result) => {
        if(err) {
          this.registerResultSubject.next(err.message);
        } else {
          this.registerResultSubject.next(result);
        }
    });

    return this.registerResult;
  }

  confirmRegistration(email:string, confirmationCode: string):Observable<any> {

    let userData = {
      Username: email,
      Pool: this.cognitoUtil.getUserPool()
    }

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true,
      (err, result) => {
        if(err) {
          let error = {
            error: err,
            message: err.message
          }
          this.registerConfirmationSubject.next(error);
        } else {
          let data = {
            error: null,
            message: result
          }

          console.log("RegisterUserService: Auto login user now");
          this.userLoginService.authenticate(this.user.email, this.user.password)
            .subscribe(
              (err) => {
                if (!err) {
                  console.log("RegisterUserService: User successfully logged in")
                  this.registerConfirmationSubject.next(data);
                }

                console.log("RegisterUserService: Error logging in " + JSON.stringify(err));
              }
            )
        }
      }
    )

    return this.registerConfirmation;
  }

  resendCode(email: string): Observable<any> {
    let userData = {
      Username: email,
      Pool: this.cognitoUtil.getUserPool()
    }

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.resendConfirmationCode(
      (err, result) => {
        //TODO: need to return in more RxJs way
        if(err) {
          this.resendConfirmationCodeSubject.next(err.message);
        } else {
          console.log('Resend Confirmation Code success: ' + result)
          this.resendConfirmationCodeSubject.next(null);
        }
      }
    )

    return this.resendConfirmationCode;
  }

}
