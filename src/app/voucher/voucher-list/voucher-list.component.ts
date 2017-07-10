import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Voucher} from "../../shared/models/voucher.model";


@Component({
  selector: 'voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit, OnChanges {

  @Input() vouchers: Voucher[];

  private total: number;

  constructor() {
  }

  ngOnInit() {

  };

  ngOnChanges(changes: any): void {

    this.total = 0;

    if (this.vouchers) {
      for (let i = 0; i < this.vouchers.length; i++) {
        this.total += +this.vouchers[i].total;
      }
    }
  }


}
