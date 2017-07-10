import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PlayerNewFormModalComponent} from "../player-new-form-modal/player-new-form-modal.component";
import {Player} from "../../shared/models/player.model";
import {PlayerService} from "../../shared/services/player.service";
import {LoadingPage} from "../../shared/models/loading-page";
import {PlayerEditFormModalComponent} from "../player-edit-form-modal/player-edit-form-modal.component";
import {ShopService} from "../../shared/services/shop.service";
import {Shop} from "../../shared/models/shop.model";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent extends LoadingPage implements OnInit {

  private players: Player[];
  private shopIds;
  private orderProperty;

  constructor(private modalService: NgbModal,
              private playerService: PlayerService) {
    super(true)
  }

  ngOnInit() {
    this.shopIds = [];
    this.playerService.list()
      .subscribe(
        (res) => {
          this.players = res;
          this.getDistinctShopId();
          this.ready();
          this.orderProperty = 'name';
        }
      );
  }

  newContact() {
    this.modalService.open(PlayerNewFormModalComponent);
  }

  editPlayer(player) {
    const modalRef = this.modalService.open(PlayerEditFormModalComponent);
    modalRef.componentInstance.player = player;
  }

  getDistinctShopId() {
    let unique = {};
    let distinct = [];
    for(let i in this.players) {
      if(typeof unique[this.players[i].shopId] == 'undefined') {
        let shopId = {
          checked: true,
          value: this.players[i].shopId
        }
        distinct.push(shopId);
      }
      unique[this.players[i].shopId] = 0;
    }

    this.shopIds = distinct;

    console.log(this.shopIds);
  }

  checked() {
    return this.shopIds.filter(item => {return item.checked})
  }

  showOrderProperty() {
    console.log(this.orderProperty)
  }

}
