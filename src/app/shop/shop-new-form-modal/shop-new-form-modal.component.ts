import { Component, OnInit } from '@angular/core';
import {Shop} from "../../shared/models/shop.model";
import {ShopService} from "../../shared/services/shop.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-shop-new-form-modal',
  templateUrl: './shop-new-form-modal.component.html',
  styleUrls: ['./shop-new-form-modal.component.css']
})
export class ShopNewFormModalComponent implements OnInit {

  private shop: Shop;

  constructor(
    private shopService: ShopService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.shop = this.shopService.newShop();
  }

  addShop() {
    this.shopService.save(this.shop)
      .subscribe(
        (res) => {
          console.log(res);
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
