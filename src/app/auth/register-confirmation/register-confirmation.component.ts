import {Component, OnInit, OnDestroy} from '@angular/core';
import {RegisterUserService} from "../../shared/services/cognito/register-user.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit, OnDestroy {

  private confirmationCode: string;
  private email: string;
  private errorMessage: string;
  private sub:any;

  constructor(
    private registerUserService: RegisterUserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params) => {
        this.email = params['email'];
      }
    );

    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {
    if(!this.email || !this.confirmationCode) {
      this.errorMessage = "All fields are required";
    }

    this.errorMessage = null;

    this.registerUserService.confirmRegistration(this.email, this.confirmationCode).subscribe(
      (result) => {
        //TODO: handle the result of confirmRegistration
        if(result.error) {
          console.log('Register confirmation component error: ' + result.error.message);
        } else {
          console.log('Register confirmation component success: ' + result);
          this.router.navigate(['/']);
        }
      }
    )
  }

}
