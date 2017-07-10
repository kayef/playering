import { Component, OnInit } from '@angular/core';
import {Shop} from "../../shared/models/shop.model";
import {ShopService} from "../../shared/services/shop.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShopNewFormModalComponent} from "../shop-new-form-modal/shop-new-form-modal.component";
import {LoadingPage} from "../../shared/models/loading-page";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
export class ShopListComponent extends LoadingPage implements OnInit {

  private shops: Shop[];

  constructor(
    private shopService: ShopService,
    private modalService: NgbModal
  ) {
    super(true);
  }

  ngOnInit() {
    this.shopService.list()
      .subscribe(
        (res) => {
          this.shops = res;
          this.ready()
        }
      );

  }

  newShop() {
    this.modalService.open(ShopNewFormModalComponent);
  }



}
