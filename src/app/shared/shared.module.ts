import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import {OrderBy} from "./pipes/order-by.pipe";
import { ShowMenuBarDirective } from './directives/show-menu-bar.directive';
import {LoadingContainerComponent} from "./components/loading-container/loading-container.component";
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ShowAuthedDirective, OrderBy, ShowMenuBarDirective, LoadingContainerComponent, FilterPipe],
  exports: [ShowAuthedDirective, OrderBy, ShowMenuBarDirective, LoadingContainerComponent, FilterPipe]
})

export class SharedModule {
}
