import {Component, OnInit} from '@angular/core';

import {UserService} from './shared';
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {ShopService} from "./shared/services/shop.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private shopId: string;
  private shopName: string;

  constructor(private userService: UserService,
              private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.checkAuthenticated().subscribe(
      auth => {
        if (!auth) {
          console.log('Auth failed');
          this.router.navigate(['/login']);
        }
      }
    );

    //subscribe to route changes
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.params)
      .subscribe(event => {
        this.shopService.setShopId(event['shopId']);
        this.shopId = event['shopId'];

      });


  }

  logout() {
    this.userService.logout();
  }

}
