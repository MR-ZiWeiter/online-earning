/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiUpcomingService } from './index.service';

describe('Service: Index', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUpcomingService]
    });
  });

  it('should ...', inject([ApiUpcomingService], (service: ApiUpcomingService) => {
    expect(service).toBeTruthy();
  }));
});
