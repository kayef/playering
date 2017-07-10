import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Voucher} from "../../shared/models/voucher.model";
import {VoucherService} from "../../shared/services/voucher.service";
import {LoadingPage} from "../../shared/models/loading-page";

@Component({
  selector: 'app-voucher-history',
  templateUrl: './voucher-history.component.html',
  styleUrls: ['./voucher-history.component.css']
})
export class VoucherHistoryComponent extends LoadingPage implements OnInit {

  private fromModel: NgbDateStruct;
  private toModel: NgbDateStruct;
  private fromDate: number;
  private toDate: number;
  private vouchers: Voucher[];

  constructor(private voucherService: VoucherService) {
    super(false);
  }

  ngOnInit() {
  }

  query() {
    this.standby();
    this.fromDate = new Date(`${this.fromModel.year}-${this.fromModel.month}-${this.fromModel.day} 00:00:00`).getTime();
    this.toDate = new Date(`${this.toModel.year}-${this.toModel.month}-${this.toModel.day} 23:59:59`).getTime();
    this.voucherService.getVoucherHistory(this.fromDate, this.toDate)
      .subscribe(
        (res) => {
          this.vouchers = res;
          this.ready();
        }
      )
  }

}
