import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {CognitoUtilService} from "./cognito-util.service";

@Injectable()
export class UserParameterService {

  private userParametersSubject = new BehaviorSubject<any>({});
  public userParameters = this.userParametersSubject.asObservable();

  constructor(
    private cognitoUtil: CognitoUtilService
  ) { }

  getParameters(): Observable<any> {

    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if(cognitoUser != null) {
      cognitoUser.getSession(
        (err, session) => {
          if(err) {
            console.log("UserParametersService: Couldn't retrieve the user");
          } else {
            cognitoUser.getUserAttributes(
              (err, result) => {
                if(err) {
                  console.log("UserParametersService: in getParameters: " + err);
                } else {
                  this.userParametersSubject.next(result);
                }
              }
            )
          }
        }
      )
    }

    return this.userParameters;
  }

}
