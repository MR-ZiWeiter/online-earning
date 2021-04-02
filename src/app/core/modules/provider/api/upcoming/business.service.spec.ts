/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiBusinessService } from './business.service';

describe('Service: Business', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBusinessService]
    });
  });

  it('should ...', inject([ApiBusinessService], (service: ApiBusinessService) => {
    expect(service).toBeTruthy();
  }));
});
