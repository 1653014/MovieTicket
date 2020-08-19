import { TestBed, async, inject } from '@angular/core/testing';

import { IsBookingGuard } from './is-booking.guard';

describe('IsBookingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsBookingGuard]
    });
  });

  it('should ...', inject([IsBookingGuard], (guard: IsBookingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
