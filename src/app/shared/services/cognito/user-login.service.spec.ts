/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLoginService } from './user-login.service';

describe('UserLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoginService]
    });
  });

  it('should ...', inject([UserLoginService], (service: UserLoginService) => {
    expect(service).toBeTruthy();
  }));
});
