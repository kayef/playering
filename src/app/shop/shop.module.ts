import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopNewFormModalComponent } from './shop-new-form-modal/shop-new-form-modal.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import {ShopRoutingModule} from "./shop-routing.module";
import { ShopNewPopupComponent } from './shop-new-popup/shop-new-popup.component';

@NgModule({
  imports: [
    ShopRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
  ],
  exports: [

  ],
  declarations: [
    ShopListComponent,
    ShopNewFormModalComponent,
    ShopDetailComponent,
    ShopNewPopupComponent,

  ],
  entryComponents:[ShopNewFormModalComponent]
})
export class ShopModule { }
