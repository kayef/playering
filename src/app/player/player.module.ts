import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerNewFormModalComponent } from './player-new-form-modal/player-new-form-modal.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {PlayerRoutingModule} from "./player-routing.module";
import { PlayerEditFormModalComponent } from './player-edit-form-modal/player-edit-form-modal.component';



@NgModule({
  imports: [
    PlayerRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [PlayerListComponent, PlayerNewFormModalComponent, PlayerEditFormModalComponent],
  entryComponents: [
    PlayerNewFormModalComponent,
    PlayerEditFormModalComponent
  ]
})
export class PlayerModule { }
