import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../../shared/services/voucher.service";
import {Voucher} from "../../shared/models/voucher.model";
import {Observable} from "rxjs";
import {ShopService} from "../../shared/services/shop.service";
import {LoadingPage} from "../../shared/models/loading-page";

@Component({
  selector: 'app-voucher-pending',
  templateUrl: './voucher-pending.component.html',
  styleUrls: ['./voucher-pending.component.css']
})
export class VoucherPendingComponent extends LoadingPage implements OnInit {

  private vouchers: Voucher[];

  constructor(private voucherService: VoucherService) {
    super(true);
  }

  ngOnInit() {
    this.standby();
    this.voucherService.getVoucherPendingList()
      .subscribe(
        (res) => {
          this.vouchers = res;
          this.ready();
        }
      )
  }
}
