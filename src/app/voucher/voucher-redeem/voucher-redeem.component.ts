import { Component, OnInit } from '@angular/core';
import {Voucher} from "../../shared/models/voucher.model";
import {VoucherService} from "../../shared/services/voucher.service";
import {Observable} from "rxjs";
import {LoadingPage} from "../../shared/models/loading-page";

@Component({
  selector: 'app-voucher-redeem',
  templateUrl: './voucher-redeem.component.html',
  styleUrls: ['./voucher-redeem.component.css']
})
export class VoucherRedeemComponent extends LoadingPage implements OnInit {

  private vouchers: Observable<Voucher[]>;
  private selectedRows: number[];
  private playerContactNumber: string;

  constructor(private voucherService: VoucherService) {
    super(false);
  }

  ngOnInit() {
    this.selectedRows = [];
  }

  clickRow(voucher) {
    if(this.rowIsSelected(voucher)) {
      this.unselectRow(voucher)
    } else {
      this.selectRow(voucher)
    }
    console.log("Selected rows: ", this.selectedRows)
  }

  rowIsSelected(voucher) {
    return this.selectedRows.some(function(selectedVoucher) {
      return selectedVoucher === voucher;
    })
  }

  selectRow(voucher) {
    this.selectedRows.push(voucher);
  }

  unselectRow(voucher) {
    let index = this.selectedRows.indexOf(voucher);
    this.selectedRows.splice(index, 1);
  }


  redeemSelectedVouchers() {
    this.voucherService.redeemSelectedVouchers(this.selectedRows);

    console.log("Selected vouchers: ", this.selectedRows);
  }

  getVoucherForPlayerContactNumber() {
    this.standby();
    this.voucherService.getVoucherForPlayerContactNumber(this.playerContactNumber)
      .subscribe(
        (res) => {
          this.ready();
          this.vouchers = res;
        }
      )
  }

}
