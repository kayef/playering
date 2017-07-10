import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../../shared/services/voucher.service";

@Component({
  selector: 'contact-number-input',
  templateUrl: './contact-number-input.component.html',
  styleUrls: ['./contact-number-input.component.css']
})
export class ContactNumberInputComponent implements OnInit {

  private playerContactNumber: string;

  constructor(private voucherService: VoucherService) { }

  ngOnInit() {
  }

  getVoucherForPlayerContactNumber() {
    console.log("Input number is: ", this.playerContactNumber);
    this.voucherService.getVoucherForPlayerContactNumber(this.playerContactNumber);
  }
}
