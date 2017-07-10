import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Voucher} from "../../shared/models/voucher.model";
import {VoucherService} from "../../shared/services/voucher.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {LoadingPage} from "../../shared/models/loading-page";

@Component({
  selector: 'app-voucher-current',
  templateUrl: './voucher-current.component.html',
  styleUrls: ['./voucher-current.component.css']
})
export class VoucherCurrentComponent extends LoadingPage implements OnInit {

  private vouchers: Voucher[];
  private fromDate: number;
  private toDate: number;


  constructor(private voucherService: VoucherService) {
    super(true);
  }

  ngOnInit() {

    let today = new Date();
    this.fromDate = today.setHours(0, 0, 0, 0);
    this.toDate = today.setHours(23, 59, 59, 0);

    this.voucherService.getVoucherCurrentList()
      .subscribe(
        (res) => {
          this.vouchers = res;
          this.ready();
        }
      )
  }

}
