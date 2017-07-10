import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs/Rx';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { User } from '../models';
import {UserLoginService} from "./cognito/user-login.service";

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private jwtService: JwtService,
    private apiService: ApiService,
    private userLoginService: UserLoginService
  ) { }

  populate() {
    //if JWT is detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      //Remove any remnants of previous authState
      this.purgeAuth();
    }
  }

  checkAuthenticated() {
    this.userLoginService.checkAuthenticated()
      .subscribe(
        auth => {
          this.isAuthenticatedSubject.next(auth);

        }
      );

    return this.isAuthenticated;
  }

  logout() {
    this.userLoginService.logout();
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.isAuthenticatedSubject.next(false);
  }

}
