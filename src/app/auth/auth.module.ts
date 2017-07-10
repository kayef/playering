import {NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { ResendCodeComponent } from './resend-code/resend-code.component';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'registerConfirmation/:username',
    component: RegisterConfirmationComponent
  },
  {
    path: 'resendCode',
    component: ResendCodeComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    authRouting
  ],
  declarations: [RegisterComponent, LoginComponent, RegisterConfirmationComponent, ResendCodeComponent]
})
export class AuthModule { }
