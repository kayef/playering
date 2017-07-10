import { Injectable } from '@angular/core';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {JwtService} from "./jwt.service";

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private jwtService: JwtService
  ) { }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get('api_path', { headers: this.setHeaders(), search: params})
      .catch(this.formatErrors)
      .map((res:Response) => res.json());
  }

}
