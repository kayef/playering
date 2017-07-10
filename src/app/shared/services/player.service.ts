import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable, BehaviorSubject, ReplaySubject} from "rxjs";
import {Player} from "../models/player.model";

@Injectable()
export class PlayerService {

  private apiPath = 'https://w3qcn2jj4f.execute-api.us-west-2.amazonaws.com/dev/player';

  private playerListSubject = new ReplaySubject<Player[]>(1);
  public playerList = this.playerListSubject.asObservable();

  constructor(
    private http: Http
  ) { }

  save(player: Player): Observable<any> {
    return this.http.post(this.apiPath, player)
      .map((res: Response) => {
        res.json();
        this.list();
      });
  }

  update(player: Player): Observable<any> {
    return this.http.put(this.apiPath + '/' + player.id, player)
      .map((res: Response) => {
        this.list();
        return res.json().Attributes;
      });
  }

  list():Observable<Player[]> {
    console.log('Executing Player list function');
    this.http.get(this.apiPath)
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          this.playerListSubject.next(res);
        }
      );

    return this.playerList;
  }

  newPlayer(): Player {
    return {
      id:'',
      userId: '',
      name: '',
      contactNumber: '',
      remark: '',
      isValid: null,
      shopId: ''
    }
  }
}
