import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Voucher} from "../models/voucher.model";
import {Observable, BehaviorSubject} from "rxjs";
import {ShopService} from "./shop.service";

@Injectable()
export class VoucherService {

  private apiPath = 'https://itp0ii5ona.execute-api.us-west-2.amazonaws.com/dev/voucher';

  private voucherListSubject = new BehaviorSubject<Voucher[]>([]);
  public voucherList = this.voucherListSubject.asObservable();

  private voucherCurrentListSubject = new BehaviorSubject<Voucher[]>([]);
  public voucherCurrentList = this.voucherCurrentListSubject.asObservable();

  private voucherHistoryListSubject = new BehaviorSubject<Voucher[]>([]);
  public voucherHistoryList = this.voucherHistoryListSubject.asObservable();

  private voucherPendingListSubject = new BehaviorSubject<Voucher[]>([]);
  public voucherPendingList = this.voucherPendingListSubject.asObservable();

  private voucherRedeemListSubject = new BehaviorSubject<Voucher[]>([]);
  public voucherRedeemList = this.voucherRedeemListSubject.asObservable();

  private fromDate: Date;
  private toDate: Date;

  constructor(private http: Http,
              private shopService: ShopService) {
    this.fromDate = new Date();
    this.toDate = new Date();
  }

  save(voucher: Voucher): Observable<any> {
    return this.http.post(this.apiPath, voucher)
      .map(res => this.getVoucherPendingList());
  }

  queryVoucherCurrent() {
    console.log("Executing queryVoucherCurrent");

    let today = new Date();
    let start = today.setHours(0, 0, 0, 0);
    let end = today.setHours(24, 0, 0, 0);
    let params = new URLSearchParams();

    params.set("fromDate", start.toString());
    params.set("toDate", end.toString());

    return this.shopService.currentShopId
      .first()
      .switchMap((shopId) => {
        params.set("shopId", shopId);
        return this.http.get(`${this.apiPath}/queryVoucherByRedeemedAt`, {search: params});
      })
      .map(res => res.json())
      .subscribe((res) => {
        this.voucherCurrentListSubject.next(res);
      })
  }

  queryVoucherHistory(fromDate: number, toDate: number) {
    console.log("Executing queryVoucherHistory");

    let params = new URLSearchParams();
    params.set("fromDate", fromDate.toString());
    params.set("toDate", toDate.toString());


    return this.shopService.currentShopId
      .first()
      .switchMap((shopId) => {
        params.set("shopId", shopId);
        return this.http.get(this.apiPath + '/queryVoucherByRedeemedAt', {search: params})
      })
      .map(res => res.json())
      .subscribe(res => this.voucherHistoryListSubject.next(res));
  }

  queryVoucherPending() {
    console.log("Executing voucher query pending function");

    let params = new URLSearchParams();
    params.set("redeemed", "0");

    return this.shopService.currentShopId
      .first()
      .switchMap((shopId) => {
        params.set("shopId", shopId);
        return this.http.get(`${this.apiPath}/queryVoucherPending`, {search: params})
      })
      .map(res => res.json())
      .subscribe(
        (res) => {
          this.voucherPendingListSubject.next(res);
          console.log("Subscribing to voucherPendingList");
        }
      );

  }

  queryVoucherPendingForPlayerContactNumber(playerContactNumber: string) {
    console.log('Executing voucher query by player contact number function');

    let params = new URLSearchParams();
    params.set('playerContactNumber', playerContactNumber);
    params.set('redeemed', '0');

    return this.shopService.currentShopId
      .first()
      .switchMap((shopId) => {
        params.set('shopId', shopId);
        return this.http.get(`${this.apiPath}/queryVoucherPendingForPlayerContactNumber`, {search: params})
      })
      .map(res => res.json());
  }

  getVoucherHistory(fromDate: number, toDate: number) {
    console.log("Executing voucher getVoucherHistory function");

    this.queryVoucherHistory(fromDate, toDate);

    return this.voucherHistoryList;
  }


  getVoucherCurrentList() {

    this.queryVoucherCurrent();

    return this.voucherCurrentList
  }

  getVoucherPendingList(): Observable<Voucher[]> {

    this.queryVoucherPending();

    return this.voucherPendingList;
  }

  getVoucherForPlayerContactNumber(playerContactNumber: string) {
    return this.queryVoucherPendingForPlayerContactNumber(playerContactNumber);
  }

  redeemSelectedVouchers(vouchers) {
    console.log("Executing redeemSelectedVouchers function");

    this.http.post(`${this.apiPath}/redeemSelectedVouchers`, vouchers)
      .subscribe((res) => console.log(res));
  }

}
