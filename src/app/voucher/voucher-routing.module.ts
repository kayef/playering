
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {VoucherCurrentComponent} from "./voucher-current/voucher-current.component";
import {VoucherHistoryComponent} from "./voucher-history/voucher-history.component";
import {VoucherPendingComponent} from "./voucher-pending/voucher-pending.component";
import {VoucherRedeemComponent} from "./voucher-redeem/voucher-redeem.component";


const voucherRoutes: Routes = [
  {
    path: ':shopId/vouchers/history',
    component: VoucherHistoryComponent
  },
  {
    path: ':shopId/vouchers/current',
    component: VoucherCurrentComponent
  },
  {
    path: ':shopId/vouchers/pending',
    component: VoucherPendingComponent
  },
  {
    path: ':shopId/vouchers/redeem',
    component: VoucherRedeemComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(voucherRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class VoucherRoutingModule{}
