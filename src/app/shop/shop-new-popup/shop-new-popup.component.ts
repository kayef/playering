import {Component, OnInit, HostBinding} from '@angular/core';
import {Router} from "@angular/router";
import {slideInDownAnimation} from "../../animation";

@Component({
  selector: 'app-shop-new-popup',
  templateUrl: './shop-new-popup.component.html',
  styleUrls: ['./shop-new-popup.component.css'],
  animations: [slideInDownAnimation]
})
export class ShopNewPopupComponent {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'black';
  @HostBinding('style.position') position = 'absolute';

  details: string;
  sending: boolean = false;

  constructor(private router: Router) { }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    //Providing a 'null' value to the named outlet
    //clears the contents of the named outlet
    this.router.navigate([{outlets: {popup: null}}]);
  }


}
