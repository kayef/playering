/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserParameterService } from './user-parameter.service';

describe('UserParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserParameterService]
    });
  });

  it('should ...', inject([UserParameterService], (service: UserParameterService) => {
    expect(service).toBeTruthy();
  }));
});
