import {Directive, TemplateRef, ViewContainerRef, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ShopService} from "../services/shop.service";
import {Observable} from "rxjs";

@Directive({
  selector: '[showMenuBar]'
})
export class ShowMenuBarDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private shopService: ShopService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    console.log('Running showMenuBar directive');
    Observable.combineLatest(
      this.userService.isAuthenticated,
      this.shopService.currentShopId
    ).subscribe(
      (res:Array<any>) => {
        if(res[0] && res[1]) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

}
