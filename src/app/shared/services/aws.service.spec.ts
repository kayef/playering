/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AwsService } from './aws.service';

describe('AwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsService]
    });
  });

  it('should ...', inject([AwsService], (service: AwsService) => {
    expect(service).toBeTruthy();
  }));
});
