import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor() { }

  getToken() {

  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

}
