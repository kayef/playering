import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Voucher} from "../../shared/models/voucher.model";

@Component({
  selector: 'voucher-current-list',
  templateUrl: './voucher-current-list.component.html',
  styleUrls: ['./voucher-current-list.component.css']
})
export class VoucherCurrentListComponent implements OnInit, OnChanges {

  @Input() vouchers: Voucher[];

  private total;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.total = 0;

    if (this.vouchers) {
      for (var i = 0; i < this.vouchers.length; i++) {
        this.total += +this.vouchers[i].total;
      }
    }
  }

}
