import { TestBed, inject } from '@angular/core/testing';

import { RaspberryPiService } from './raspberry-pi.service';

describe('RaspberryPiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaspberryPiService]
    });
  });

  it('should be created', inject([RaspberryPiService], (service: RaspberryPiService) => {
    expect(service).toBeTruthy();
  }));
});
