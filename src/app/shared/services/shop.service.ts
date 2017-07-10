import { Injectable } from '@angular/core';
import {Shop} from "../models/shop.model";
import {Http, Response} from "@angular/http";
import {Observable, BehaviorSubject, ReplaySubject} from "rxjs";
import {Router, ActivatedRoute, NavigationEnd, RoutesRecognized} from "@angular/router";

@Injectable()
export class ShopService {

  private apiPath = 'https://umy4zciete.execute-api.us-west-2.amazonaws.com/dev/shop';

  private shopListSubject = new BehaviorSubject<Shop[]>([]);
  public shopList = this.shopListSubject.asObservable();

  private currentShopIdSubject = new ReplaySubject<string>(1);
  public currentShopId = this.currentShopIdSubject.asObservable();

  constructor(
    private http: Http,

  ) { }

  save(shop: Shop) {
    return this.http.post(this.apiPath, shop)
      .map((res: Response) => this.list());
  }

  list(): Observable<Shop[]> {
    this.http.get(this.apiPath)
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          console.log(res);
          this.shopListSubject.next(res);
        }
      );

    return this.shopList;
  }

  setShopId(shopId) {
    this.currentShopIdSubject.next(shopId);
  }

  newShop(): Shop {
    return {
      id: '',
      name: '',
      code: '',
      remark: '',
      isValid: 1,
      createdAt: null,
      updatedAt: null,
    }
  }


}
