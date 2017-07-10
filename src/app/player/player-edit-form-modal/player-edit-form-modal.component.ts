import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PlayerService} from "../../shared/services/player.service";
import {ShopService} from "../../shared/services/shop.service";
import {Shop} from "../../shared/models/shop.model";

@Component({
  selector: 'app-player-edit-form-modal',
  templateUrl: '../player-new-form-modal/player-new-form-modal.component.html',
  styleUrls: ['./player-edit-form-modal.component.css']
})
export class PlayerEditFormModalComponent implements OnInit {

  @Input() player;
  private title: string;
  private shops: Shop[];

  constructor(
    public activeModal: NgbActiveModal,
    private playerService: PlayerService,
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.title = "Edit Player";
    this.shopService.list()
      .subscribe(
        (res) => {
          this.shops = res;
        }
      )
  }

  save() {
    this.playerService.update(this.player)
      .subscribe(
        (res) => {
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
