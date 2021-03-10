/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecentlyVideoService } from './recently-video.service';

describe('Service: RecentlyVideo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentlyVideoService]
    });
  });

  it('should ...', inject([RecentlyVideoService], (service: RecentlyVideoService) => {
    expect(service).toBeTruthy();
  }));
});
