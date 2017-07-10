/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CognitoUtilService } from './cognito-util.service';

describe('CognitoUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CognitoUtilService]
    });
  });

  it('should ...', inject([CognitoUtilService], (service: CognitoUtilService) => {
    expect(service).toBeTruthy();
  }));
});
