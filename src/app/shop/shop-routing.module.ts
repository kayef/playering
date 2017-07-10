import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {ShopListComponent} from "./shop-list/shop-list.component";
import {ShopDetailComponent} from "./shop-detail/shop-detail.component";
import {ShopNewPopupComponent} from "./shop-new-popup/shop-new-popup.component";

const shopRoutes: Routes = [
  {
    path: '',
    component: ShopListComponent
  },
  {
    path: ':shopId',
    component: ShopDetailComponent
  },
  {
    path: 'new',
    component: ShopNewPopupComponent,
    outlet: 'popup'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(shopRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ShopRoutingModule { }
