import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../../shared/services/voucher.service";
import {PlayerService} from "../../shared/services/player.service";
import {Player} from "../../shared/models/player.model";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'voucher-new-form',
  templateUrl: './voucher-new-form.component.html',
  styleUrls: ['./voucher-new-form.component.css']
})
export class VoucherNewFormComponent implements OnInit {

  private playerName: string;
  private contactNumber: string;
  private total: number;
  private loading: boolean;
  private players: Player[];
  private player: Player;

  constructor(
    private voucherService: VoucherService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.playerService.playerList
      .subscribe(
        (res) => {
          this.players = res;
        }
      )

    this.playerService.list();

  }

  addVoucher() {

    this.loading = true;

    let voucher = {
      playerUserId: this.player.userId,
      playerName: this.player.name,
      playerContactNumber: this.player.contactNumber,
      playerId: this.player.id,
      isValid: 1,
      redeemed: false,
      total: this.total,
      id: null,
      shopId: this.route.snapshot.params['shopId'],
      createdAt: 0,
      redeemedAt: 0
    };

    this.voucherService.save(voucher)
      .subscribe(
        (data) => {
          this.resetForm();
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      )
  }

  resetForm() {
    this.playerName = null;
    this.contactNumber = '';
    this.total = null;
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.players.filter(v => new RegExp(term, 'gi').test(v.name)));

  formatter = (player) => player.name;

  selected($event) {
    this.contactNumber = $event.item.contactNumber;
  }
}


