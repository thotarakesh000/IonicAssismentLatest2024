import { TestBed } from '@angular/core/testing';

import { AutoReadOtpService } from './auto-read-otp.service';

describe('AutoReadOtpService', () => {
  let service: AutoReadOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoReadOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
