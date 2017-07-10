import { Component, OnInit } from '@angular/core';
import {RegisterUserService} from "../../shared/services/cognito/register-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resend-code',
  templateUrl: './resend-code.component.html',
  styleUrls: ['./resend-code.component.css']
})
export class ResendCodeComponent implements OnInit {

  private email: string;
  private errorMessage: string;

  constructor(
    private registerUserService: RegisterUserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resendCode() {
    this.registerUserService.resendCode(this.email)
      .subscribe(
        (result) => {
          //TODO: Handle resend code result here
          if(result) {
            console.log(result);
            this.router.navigate(['registerConfirmation', this.email])
          }
        }
      )
  }

}
