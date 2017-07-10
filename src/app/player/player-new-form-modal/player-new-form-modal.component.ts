import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PlayerService} from "../../shared/services/player.service";
import {Player} from "../../shared/models/player.model";
import {Shop} from "../../shared/models/shop.model";
import {ShopService} from "../../shared/services/shop.service";

@Component({
  selector: 'app-player-new-form-modal',
  templateUrl: './player-new-form-modal.component.html',
  styleUrls: ['./player-new-form-modal.component.css']
})
export class PlayerNewFormModalComponent implements OnInit {

  private player: Player;
  private title: string;
  private shops: Shop[];


  constructor(
    public activeModal: NgbActiveModal,
    private playerService: PlayerService,
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.title = 'Add New Player';
    this.player = this.playerService.newPlayer();
    this.shopService.list()
      .subscribe(
        (res) => {
          this.shops = res;
        }
      )
  }

  save() {
    this.playerService.save(this.player)
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
