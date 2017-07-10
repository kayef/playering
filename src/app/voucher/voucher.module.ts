import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoucherListComponent} from './voucher-list/voucher-list.component';
import {VoucherListItemComponent} from './voucher-list-item/voucher-list-item.component';
import {VoucherNewFormComponent} from './voucher-new-form/voucher-new-form.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {VoucherRoutingModule} from "./voucher-routing.module";
import {VoucherCurrentComponent} from './voucher-current/voucher-current.component';
import {VoucherHistoryComponent} from './voucher-history/voucher-history.component';
import {VoucherPendingComponent} from './voucher-pending/voucher-pending.component';
import {VoucherRedeemComponent} from './voucher-redeem/voucher-redeem.component';
import {ContactNumberInputComponent} from './contact-number-input/contact-number-input.component';
import { VoucherCurrentListComponent } from './voucher-current-list/voucher-current-list.component';
import {SharedModule} from "../shared/shared.module";
import { VoucherEmptyComponent } from './voucher-empty/voucher-empty.component';


@NgModule({
  imports: [
    VoucherRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [VoucherListComponent, VoucherListItemComponent, VoucherNewFormComponent, VoucherCurrentComponent, VoucherHistoryComponent, VoucherPendingComponent, VoucherRedeemComponent, ContactNumberInputComponent, VoucherCurrentListComponent, VoucherEmptyComponent]
})
export class VoucherModule {
}
