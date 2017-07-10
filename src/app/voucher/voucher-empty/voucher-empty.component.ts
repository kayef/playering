import {Component, OnInit, Input} from '@angular/core';
import {Voucher} from "../../shared/models/voucher.model";

@Component({
  selector: 'voucher-empty',
  templateUrl: './voucher-empty.component.html',
  styleUrls: ['./voucher-empty.component.css']
})
export class VoucherEmptyComponent implements OnInit {

  @Input() vouchers: Voucher[];

  constructor() { }

  ngOnInit() {
  }

}
