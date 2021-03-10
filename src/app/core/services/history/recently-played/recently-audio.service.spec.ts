/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecentlyAudioService } from './recently-audio.service';

describe('Service: RecentlyAudio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentlyAudioService]
    });
  });

  it('should ...', inject([RecentlyAudioService], (service: RecentlyAudioService) => {
    expect(service).toBeTruthy();
  }));
});
