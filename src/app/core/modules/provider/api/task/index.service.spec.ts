/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiTaskIndexService } from './index.service';

describe('Service: Index', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTaskIndexService]
    });
  });

  it('should ...', inject([ApiTaskIndexService], (service: ApiTaskIndexService) => {
    expect(service).toBeTruthy();
  }));
});
