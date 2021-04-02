/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessInfoService } from './business-info.service';

describe('Service: BusinessInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessInfoService]
    });
  });

  it('should ...', inject([BusinessInfoService], (service: BusinessInfoService) => {
    expect(service).toBeTruthy();
  }));
});
