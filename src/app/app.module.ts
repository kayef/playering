import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  UserService,
  JwtService,
  ApiService,
  AwsService,
  CognitoUtilService,
  UserLoginService,
  SharedModule
} from './shared';

import { AppComponent } from './app.component';
import {HomeModule} from "./home/home.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AboutModule} from "./about/about.module";
import {AuthModule} from "./auth/auth.module";
import {RegisterUserService} from "./shared/services/cognito/register-user.service";
import {UserParameterService} from "./shared/services/cognito/user-parameter.service";
import {VoucherModule} from "./voucher/voucher.module";
import {VoucherService} from "./shared/services/voucher.service";
import {PlayerModule} from "./player/player.module";
import {PlayerService} from "./shared/services/player.service";
import {ShopModule} from "./shop/shop.module";
import {ShopService} from "./shared/services/shop.service";
import { NotFoundComponent } from './not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    AboutModule,
    SharedModule,
    AuthModule,
    VoucherModule,
    PlayerModule,
    ShopModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [
    UserService,
    JwtService,
    ApiService,
    AwsService,
    CognitoUtilService,
    UserLoginService,
    RegisterUserService,
    UserParameterService,
    VoucherService,
    PlayerService,
    ShopService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
