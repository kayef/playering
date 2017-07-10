import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {UserLoginService} from "../../shared/services/cognito/user-login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;
  private errorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private userLoginService: UserLoginService
  ) { }

  ngOnInit() {
    this.errorMessage = null;
    console.log("Checking if user is logged in, if true, send to home page again");
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if(isAuthenticated) {
          this.router.navigate(['/']);
        }
      }
    )
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "All fields are required";
      return;
    }
    this.errorMessage = null;
    this.userLoginService.authenticate(this.email, this.password)
      .subscribe(
        (result) => {
          //TODO: Need to implement cognito login method here
          console.log(result);
        }
      )
  }

}
