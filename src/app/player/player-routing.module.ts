import {RouterModule, Routes} from "@angular/router";
import {PlayerListComponent} from "./player-list/player-list.component";
import {NgModule} from "@angular/core";

const playerRouting: Routes = [
  {
    path:':shopId/players',
    component: PlayerListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(playerRouting)
  ],
  exports: [
    RouterModule
  ]
})

export class PlayerRoutingModule {}
