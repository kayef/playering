import { Component, OnInit } from '@angular/core';
import {RegisterUser} from "../../shared/models/register-user.model";
import {RegisterUserService} from "../../shared/services/cognito/register-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerUser: RegisterUser;
  private errorMessage: string;

  constructor(
    private registerUserService: RegisterUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerUser = new RegisterUser();
    this.errorMessage = null;
  }

  onRegister() {
    this.errorMessage = null;
    this.registerUserService.registerUser(this.registerUser)
      .subscribe(
        (result) => {
          //TODO: redirect to confirm register component
          if(result.user) {
            //This means registration was successful, redirect to registration confirmation panel
            console.log('Register Component onRegister result: ' + JSON.stringify(result));
            this.router.navigate(['/registerConfirmation', result.user.username]);
          } else {
            console.log('Register Component onRegister error: ' + result);
          }

        }
      )
  }

}
