/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarteService } from './carte.service';

describe('Service: Carte', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarteService]
    });
  });

  it('should ...', inject([CarteService], (service: CarteService) => {
    expect(service).toBeTruthy();
  }));
});
